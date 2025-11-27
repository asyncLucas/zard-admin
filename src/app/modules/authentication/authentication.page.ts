import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Component, inject, signal } from '@angular/core';
import { ZardButtonComponent } from '@app/shared/components/button/button.component';
import { ZardCardComponent } from '@app/shared/components/card/card.component';
import { ZardCheckboxComponent } from '@app/shared/components/checkbox/checkbox.component';
import { ZardInputDirective } from '@app/shared/components/input/input.directive';
import { ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent } from '@app/shared/components/form/form.component';
import { RouterLink } from "@angular/router";
import { ThemeService } from '@app/shared/services/theme.service';

@Component({
  selector: 'z-authentication-01',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardCardComponent,
    ZardCheckboxComponent,
    ZardInputDirective,
    ZardFormFieldComponent,
    ZardFormLabelComponent,
    ZardFormControlComponent,
    RouterLink
],
  templateUrl: './authentication.page.html',
})
export class AuthenticationComponent {
  readonly themeService = inject(ThemeService);
  protected readonly isLoading = signal(false);

  protected readonly loginForm = new FormGroup({
    email: new FormControl('lucas@zard.com', [Validators.required, Validators.email]),
    password: new FormControl('*******', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(true),
  });
}
