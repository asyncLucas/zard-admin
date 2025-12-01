import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ZardButtonComponent } from '@app/shared/components/button/button.component';
import { ZardFormModule } from '@app/shared/components/form/form.module';
import { ZardInputDirective } from '@app/shared/components/input/input.directive';
import { ZardDatePickerComponent } from '@app/shared/components/date-picker/date-picker.component';
import { ZardSelectItemComponent } from '@app/shared/components/select/select-item.component';

@Component({
  selector: 'zard-demo-form-reactive',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormModule,
    ZardDatePickerComponent,
    ZardSelectItemComponent,
  ],
  standalone: true,
  template: `
    <form
      [formGroup]="profileForm"
      (ngSubmit)="onSubmit()"
      class="max-w-sm space-y-6"
    >
      <z-form-field>
        <label z-form-label zRequired>Username</label>
        <z-form-control>
          <input
            z-input
            type="text"
            placeholder="Choose a username"
            formControlName="username"
          />
        </z-form-control>
        <z-form-message zType="default"
          >Username must be 3-20 characters long.</z-form-message
        >
      </z-form-field>

      <z-form-field>
        <label z-form-label zRequired>AnyDate</label>
        <z-form-control>
          <z-date-picker
            z-input
            type="select"
            placeholder="Choose any date"
            formControlName="anyDate"
            zFormat="dd/MM/yyyy"
          />
        </z-form-control>
        <z-form-message zType="default"
          >AnyDate must be a valid date.</z-form-message
        >
      </z-form-field>

      <z-form-field>
        <label z-form-label zRequired>Developer Role</label>
        <z-form-control>
          <z-select
            formControlName="developerId"
            placeholder="Select a developer role"
          >
            @for (c of roles(); track c.id) {
              <z-select-item [zValue]="c.id">
                {{ c.name }}
              </z-select-item>
            }
          </z-select>
        </z-form-control>
        @if (
          profileForm.get('developerId')?.invalid &&
          profileForm.get('developerId')?.touched
        ) {
          <z-form-message zType="error">Customer is required</z-form-message>
        }
      </z-form-field>

      <z-form-field>
        <label z-form-label zRequired>Email</label>
        <z-form-control>
          <input
            z-input
            type="email"
            placeholder="Enter your email"
            formControlName="email"
          />
        </z-form-control>
        <z-form-message zType="default"
          >We'll use this for account notifications.</z-form-message
        >
      </z-form-field>

      <z-form-field>
        <label z-form-label zRequired>Password</label>
        <z-form-control>
          <input
            z-input
            type="password"
            placeholder="Create a password"
            formControlName="password"
          />
        </z-form-control>
        <z-form-message zType="default"
          >Password must be at least 6 characters.</z-form-message
        >
      </z-form-field>

      <button
        z-button
        zType="default"
        type="submit"
        [disabled]="profileForm.invalid"
      >
        Create Account
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DefaultFormReactiveComponent {
  profileForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    anyDate: new FormControl('', [Validators.required]),
    developerId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  roles = computed(() => [
    { id: 'frontend', name: 'Frontend Developer' },
    { id: 'backend', name: 'Backend Developer' },
    { id: 'fullstack', name: 'Fullstack Developer' },
    { id: 'devops', name: 'DevOps Engineer' },
  ]);

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
      alert(
        `Form submitted successfully! ${JSON.stringify(this.profileForm.value, null, 2)}`
      );
    }
  }
}
