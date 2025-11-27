// dynamic-zard-form.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';


// ZardUI imports – adjust paths to your generated components

// LocalStorage directive
import { PersistFormDirective } from './persist-form.directive';
import { ZardButtonComponent } from '../button/button.component';
import { ZardCheckboxComponent } from '../checkbox/checkbox.component';
import { ZardDatePickerComponent } from '../date-picker/date-picker.component';
import { ZardFormModule } from '../form/form.module';
import { ZardInputDirective } from '../input/input.directive';
import { ZardSelectItemComponent } from '../select/select-item.component';
import { ZardSelectComponent } from '../select/select.component';
import { ZardSwitchComponent } from '../switch/switch.component';
import { ZardRadioComponent } from '../radio/radio.component';
import { FieldConfig, FormConfig, ValidatorConfig } from './dynamic-form.model';

interface BuiltField {
  key: string;
  config: FieldConfig;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ZardFormModule,
    ZardInputDirective,
    ZardButtonComponent,
    ZardDatePickerComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ZardRadioComponent,
    ZardCheckboxComponent,
    ZardSwitchComponent,
    PersistFormDirective,
  ],
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicZardFormComponent {
  private readonly fb = new FormBuilder();
  readonly formConfig = input<FormConfig | null>(null);
  readonly submitted = output<any>();
  readonly form = signal<FormGroup | null>(null);

  readonly fields = computed<BuiltField[]>(() => {
    const cfg = this.formConfig();
    if (!cfg) return [];

    return Object.entries(cfg.properties ?? {}).map(([key, config]) => ({
      key,
      config,
    }));
  });

  readonly excludeFromPersist = computed<string[]>(() => {
    const cfg = this.formConfig();
    if (!cfg) return [];

    // Exclude file inputs from localStorage persistence
    return Object.entries(cfg.properties ?? {})
      .filter(([_, config]) => config.type === 'file')
      .map(([key]) => key);
  });

  readonly layoutClasses = computed(() => {
    const cfg = this.formConfig();
    const gap = cfg?.gap ?? 4;
    return `flex flex-wrap gap-${gap}`;
  });

  getFieldClasses(field: FieldConfig): string {
    const size = field.size ?? 12;
    // Calculate percentage: size/12 * 100
    // Use Tailwind's width classes that approximate the 12-column system
    const sizeMap: Record<number, string> = {
      2: 'w-full md:w-[16.666667%] md:flex-[0_0_calc(16.666667%-1rem)]',
      3: 'w-full md:w-[25%] md:flex-[0_0_calc(25%-1rem)]',
      4: 'w-full md:w-[33.333333%] md:flex-[0_0_calc(33.333333%-1rem)]',
      5: 'w-full md:w-[41.666667%] md:flex-[0_0_calc(41.666667%-1rem)]',
      6: 'w-full md:w-[50%] md:flex-[0_0_calc(50%-1rem)]',
      7: 'w-full md:w-[58.333333%] md:flex-[0_0_calc(58.333333%-1rem)]',
      8: 'w-full md:w-[66.666667%] md:flex-[0_0_calc(66.666667%-1rem)]',
      9: 'w-full md:w-[75%] md:flex-[0_0_calc(75%-1rem)]',
      10: 'w-full md:w-[83.333333%] md:flex-[0_0_calc(83.333333%-1rem)]',
      11: 'w-full md:w-[91.666667%] md:flex-[0_0_calc(91.666667%-1rem)]',
      12: 'w-full',
    };
    return sizeMap[size] || sizeMap[12];
  }

  constructor() {
    effect(
      () => {
        const cfg = this.formConfig();
        if (!cfg) return;
        this.buildForm(cfg);
      },
    );
  }

  private buildForm(cfg: FormConfig): void {
    const groupConfig: Record<string, any> = {};

    Object.entries(cfg.properties).forEach(([key, field]) => {
      const validators = this.mapValidators(field.validators ?? []);
      
      // File inputs must always have null as initial value (cannot be set programmatically)
      // Also convert empty strings to null for date-picker and other fields
      let initialValue = field.initialValue ?? null;
      
      if (field.type === 'file') {
        initialValue = null;
      } else if (initialValue === '') {
        initialValue = null;
      }
      
      groupConfig[key] = [
        { value: initialValue, disabled: field.disabled ?? false },
        validators,
      ];
    });

    const formGroup = this.fb.group(groupConfig);
    this.form.set(formGroup);
  }

  private mapValidators(configs: ValidatorConfig[]): ValidatorFn[] {
    const fns: ValidatorFn[] = [];

    for (const v of configs) {
      switch (v.type) {
        case 'required':
          fns.push(Validators.required);
          break;
        case 'minLength':
          fns.push(Validators.minLength(v.value ?? 0));
          break;
        case 'maxLength':
          fns.push(Validators.maxLength(v.value ?? Number.MAX_SAFE_INTEGER));
          break;
        case 'email':
          fns.push(Validators.email);
          break;
        case 'pattern':
          if (v.value) fns.push(Validators.pattern(v.value));
          break;
        case 'min':
          fns.push(Validators.min(v.value ?? 0));
          break;
        case 'max':
          fns.push(Validators.max(v.value ?? Number.MAX_SAFE_INTEGER));
          break;
      }
    }

    return fns;
  }

  isRequired(field: FieldConfig): boolean {
    return (field.validators ?? []).some(v => v.type === 'required');
  }

  getError(fieldKey: string): string {
    const form = this.form();
    if (!form) return '';

    const control = form.get(fieldKey);
    if (!control || !control.touched || !control.errors) return '';

    const errors = control.errors;
    const errorMessages: Record<string, (error: any) => string> = {
      required: () => 'Este campo é obrigatório.',
      minlength: (error) => `Mínimo de ${error.requiredLength} caracteres.`,
      maxlength: (error) => `Máximo de ${error.requiredLength} caracteres.`,
      email: () => 'Email inválido.',
      min: (error) => `Valor mínimo: ${error.min}.`,
      max: (error) => `Valor máximo: ${error.max}.`,
      minDate: (error) => `Data mínima: ${new Date(error.minDate).toLocaleDateString()}.`,
      maxDate: (error) => `Data máxima: ${new Date(error.maxDate).toLocaleDateString()}.`,
      pattern: () => 'Formato inválido.',
    };

    const errorKey = Object.keys(errors)[0];
    if (errorKey && errorMessages[errorKey]) {
      return errorMessages[errorKey](errors[errorKey]);
    }

    return 'Valor inválido.';
  }

  onSubmit(): void {
    const form = this.form();
    if (!form) return;
    form.markAllAsTouched();

    if (form.valid) {
      this.submitted.emit(form.value);
    }
  }

  onReset(): void {
    const form = this.form();
    if (!form) return;
    form.reset();
  }

  hasError(fieldKey: string): boolean {
    const form = this.form();
    if (!form) return false;
    const control = form.get(fieldKey);
    return !!control && control.invalid && control.touched;
  }
}
