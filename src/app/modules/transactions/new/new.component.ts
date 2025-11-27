import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZardFormModule } from '@app/shared/components/form/form.module';
import { ZardInputDirective } from '@app/shared/components/input/input.directive';
import { ZardDatePickerComponent } from "@app/shared/components/date-picker/date-picker.component";

@Component({
  selector: 'app-new-transaction',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ZardInputDirective,
    ZardFormModule,
    ZardDatePickerComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <form
      class="space-y-6 flex-1 max-w-lg"
      [formGroup]="form"
      novalidate
    >
      <z-form-field>
        <label z-form-label zRequired for="seller">Seller</label>
        <z-form-control>
          <input
            z-input
            id="seller"
            type="text"
            formControlName="seller"
            placeholder="Seller name"
          />
        </z-form-control>
        @if (form.get('seller')?.touched && form.get('seller')?.invalid) {
          <z-form-message>
            @if (form.get('seller')?.errors?.['required']) {
              Seller is required.
            }
            @if (form.get('seller')?.errors?.['minlength']) {
              Minimum 2 characters.
            }
          </z-form-message>
        }
      </z-form-field>
      
      <z-form-field>
        <label z-form-label zRequired for="seller">Date</label>
        <z-form-control>
          <z-date-picker
            formControlName="date"
            zFormat="yyyy-MM-dd"
            required
          />
        </z-form-control>
        @if (form.get('date')?.touched && form.get('date')?.invalid) {
          <z-form-message>
            @if (form.get('date')?.errors?.['required']) {
              Date is required.
            }
          </z-form-message>
        }
      </z-form-field>

      <z-form-field>
        <label z-form-label zRequired for="amount">Amount</label>
        <z-form-control>
          <input
            z-input
            id="amount"
            type="number"
            step="0.01"
            inputmode="decimal"
            formControlName="amount"
            placeholder="0.00"
          />
        </z-form-control>
        @if (form.get('amount')?.touched && form.get('amount')?.invalid) {
          <z-form-message>
            @if (form.get('amount')?.errors?.['required']) {
              Amount is required.
            }
            @if (form.get('amount')?.errors?.['min']) {
              Must be greater than 0.
            }
          </z-form-message>
        }
      </z-form-field>

      <z-form-field>
        <label z-form-label zRequired for="attachment">Attachment</label>
        <z-form-control>
          <input
            z-input
            id="attachment"
            type="file"
            formControlName="attachment"
            (change)="onFileSelected($event)"
          />
        </z-form-control>
        @if (
          form.get('attachment')?.touched && form.get('attachment')?.invalid
        ) {
          <z-form-message> Attachment is required. </z-form-message>
        }
      </z-form-field>
    </form>
  `,
})
export class NewTransactionPage {
  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      seller: ['', [Validators.required, Validators.minLength(2)]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [new Date().toISOString(), [Validators.required]],
      attachment: [null, [Validators.required]],
    });
  }

  onFileSelected(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0] || null;
    this.form.patchValue({ attachment: file });
    this.form.get('attachment')?.markAsTouched();
  }
}
