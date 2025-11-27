import type { ClassValue } from 'clsx';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, type TemplateRef, viewChild, ViewEncapsulation, forwardRef, signal, effect } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { mergeClasses } from '@shared/utils/merge-classes';
import { ZardButtonComponent } from '../button/button.component';
import { ZardCalendarComponent } from '../calendar/calendar.component';
import { ZardIconComponent } from '../icon/icon.component';
import { ZardPopoverComponent, ZardPopoverDirective } from '../popover/popover.component';
import { datePickerVariants, type ZardDatePickerVariants } from './date-picker.variants';


@Component({
  selector: 'z-date-picker, [z-date-picker]',
  exportAs: 'zDatePicker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ZardButtonComponent, ZardCalendarComponent, ZardPopoverComponent, ZardPopoverDirective, ZardIconComponent],
  host: {},
  template: `
    <button
      z-button
      type="button"
      [zType]="zType()"
      [zSize]="zSize()"
      [disabled]="isDisabled()"
      [class]="buttonClasses()"
      zPopover
      #popoverDirective="zPopover"
      [zContent]="calendarTemplate"
      zTrigger="click"
      (zVisibleChange)="onPopoverVisibilityChange($event)"
      [attr.aria-expanded]="false"
      [attr.aria-haspopup]="true"
      aria-label="Choose date"
    >
      <z-icon zType="calendar" />
      <span [class]="textClasses()">
        {{ displayText() }}
      </span>
    </button>

    <ng-template #calendarTemplate>
      <z-popover [class]="popoverClasses()">
        <z-calendar #calendar [value]="model()" [minDate]="minDate()" [maxDate]="maxDate()" [disabled]="isDisabled()" (dateChange)="onCalendarDateChange($event)" />
      </z-popover>
    </ng-template>
  `,
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZardDatePickerComponent),
      multi: true,
    },
  ],
})
export class ZardDatePickerComponent implements ControlValueAccessor {
  private readonly datePipe = inject(DatePipe);

  // Internal model for ControlValueAccessor
  protected readonly model = signal<Date | null>(null);
  private readonly disabledState = signal<boolean>(false);
  private isCva = false;

  readonly calendarTemplate = viewChild.required<TemplateRef<unknown>>('calendarTemplate');
  readonly popoverDirective = viewChild.required<ZardPopoverDirective>('popoverDirective');
  readonly calendar = viewChild.required<ZardCalendarComponent>('calendar');

  readonly class = input<ClassValue>('');
  readonly zType = input<ZardDatePickerVariants['zType']>('outline');
  readonly zSize = input<ZardDatePickerVariants['zSize']>('default');
  readonly value = input<Date | null>(null);
  readonly placeholder = input<string>('Pick a date');
  readonly zFormat = input<string>('MMMM d, yyyy');
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly disabled = input<boolean>(false);

  readonly dateChange = output<Date | null>();

  // ControlValueAccessor implementation
  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | null): void {
    this.model.set(value ?? null);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
    this.isCva = true;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabledState.set(!!isDisabled);
  }

  // Sync external value input to model when not used as CVA
  constructor() {
    effect(() => {
      if (!this.isCva) {
        this.model.set(this.value());
      }
    });
  }

  protected readonly classes = computed(() =>
    mergeClasses(
      datePickerVariants({
        zSize: this.zSize(),
      }),
      this.class(),
    ),
  );

  protected readonly buttonClasses = computed(() => {
    const hasValue = !!this.model();
    const size: NonNullable<ZardDatePickerVariants['zSize']> = this.zSize() ?? 'default';
    return mergeClasses('justify-start text-left font-normal', !hasValue && 'text-muted-foreground', 'w-full');
  });

  protected readonly textClasses = computed(() => {
    const hasValue = !!this.model();
    return mergeClasses(!hasValue && 'text-muted-foreground');
  });

  protected readonly popoverClasses = computed(() => mergeClasses('w-auto p-0'));

  protected readonly isDisabled = computed(() => this.disabled() || this.disabledState());

  protected readonly displayText = computed(() => {
    const date = this.model();
    if (!date) {
      return this.placeholder();
    }
    return this.formatDate(date, this.zFormat());
  });

  protected onCalendarDateChange(date: Date | Date[] | null): void {
    // Date picker always uses single mode, so we can safely cast
    const singleDate = Array.isArray(date) ? (date[0] ?? null) : date;
    
    // Update the model
    this.model.set(singleDate);
    
    // Emit to output
    this.dateChange.emit(singleDate);
    
    // Notify form control if used as CVA
    if (this.isCva) {
      this.onChange(singleDate);
    }
    
    // Close popover after selection
    if (singleDate !== null) {
      setTimeout(() => {
        this.popoverDirective()?.hide();
      }, 150);
    }
  }

  protected onPopoverVisibilityChange(visible: boolean): void {
    if (visible) {
      // Use a small delay to ensure the calendar is rendered before resetting
      setTimeout(() => {
        const cal = this.calendar();
        if (cal) {
          cal.resetNavigation();
        }
      }, 10);
    } else {
      // Mark as touched when popover closes
      this.onTouched();
    }
  }

  private formatDate(date: Date, format: string): string {
    return this.datePipe.transform(date, format) ?? '';
  }
}
