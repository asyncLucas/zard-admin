import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
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
import { ZardFormModule } from '../form/form.module';
import { ZardInputDirective } from '../input/input.directive';
import { ZardSelectItemComponent } from '../select/select-item.component';
import { ZardSelectComponent } from '../select/select.component';
import { ZardSwitchComponent } from '../switch/switch.component';
import { ZardRadioComponent } from '../radio/radio.component';
import { FieldConfig, FormConfig, ValidatorConfig } from './dynamic-form.model';
import { TranslateService } from '@ngx-translate/core';
import { ZardDatePickerComponent } from '../date-picker/date-picker.component';

interface BuiltField {
  key: string;
  config: FieldConfig;
}

@Component({
  selector: 'ez-dynamic-form',
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
  private readonly translate = inject(TranslateService);
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
    return `grid grid-cols-12 gap-${gap}`;
  });

  getFieldClasses(field: FieldConfig): string {
    const size = field.size ?? 12;
    const sizeMap: Record<number, string> = {
      1: 'col-span-12 md:col-span-1',
      2: 'col-span-12 md:col-span-2',
      3: 'col-span-12 md:col-span-3',
      4: 'col-span-12 md:col-span-4',
      5: 'col-span-12 md:col-span-5',
      6: 'col-span-12 md:col-span-6',
      7: 'col-span-12 md:col-span-7',
      8: 'col-span-12 md:col-span-8',
      9: 'col-span-12 md:col-span-9',
      10: 'col-span-12 md:col-span-10',
      11: 'col-span-12 md:col-span-11',
      12: 'col-span-12',
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
        case 'requiredTrue':
          fns.push(Validators.requiredTrue);
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
      required: () => this.translate.instant('VALIDATION.REQUIRED'),
      requiredTrue: () => this.translate.instant('VALIDATION.REQUIRED_TRUE'),
      minlength: (error) => this.translate.instant('VALIDATION.MINLENGTH', { requiredLength: error.requiredLength }),
      maxlength: (error) => this.translate.instant('VALIDATION.MAXLENGTH', { requiredLength: error.requiredLength }),
      email: () => this.translate.instant('VALIDATION.EMAIL'),
      min: (error) => this.translate.instant('VALIDATION.MIN', { min: error.min }),
      max: (error) => this.translate.instant('VALIDATION.MAX', { max: error.max }),
      minDate: (error) => this.translate.instant('VALIDATION.MIN_DATE', { minDate: new Date(error.minDate).toLocaleDateString() }),
      maxDate: (error) => this.translate.instant('VALIDATION.MAX_DATE', { maxDate: new Date(error.maxDate).toLocaleDateString() }),
      pattern: () => this.translate.instant('VALIDATION.PATTERN'),
    };

    const errorKey = Object.keys(errors)[0];
    if (errorKey && errorMessages[errorKey]) {
      return errorMessages[errorKey](errors[errorKey]);
    }

    return this.translate.instant('VALIDATION.INVALID');
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
