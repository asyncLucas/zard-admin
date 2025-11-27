import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZardButtonComponent } from '@app/shared/components/button/button.component';
import { ZardCardComponent } from '@app/shared/components/card/card.component';
import { ZardInputDirective } from '@app/shared/components/input/input.directive';
import { ZardSwitchComponent } from '@app/shared/components/switch/switch.component';

@Component({
  selector: 'app-security',
  imports: [
    FormsModule,
    CommonModule,
    ZardCardComponent,
    ZardButtonComponent,
    ZardCardComponent,
    ZardInputDirective,
    ZardSwitchComponent,
    ZardButtonComponent
],
  template: `
    <div class="grid gap-6 md:grid-cols-[2fr_1.2fr]">
      <!-- Password & 2FA -->
      <z-card
        zTitle="Password & authentication"
        zDescription="Keep your account secure by using a strong password and two-factor authentication."
      >
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-sm font-medium">Current password</label>
            <input
              z-input
              type="password"
              placeholder="••••••••"
              [(ngModel)]="security.currentPassword"
            />
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-sm font-medium">New password</label>
              <input
                z-input
                type="password"
                placeholder="New password"
                [(ngModel)]="security.newPassword"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Confirm password</label>
              <input
                z-input
                type="password"
                placeholder="Repeat password"
                [(ngModel)]="security.confirmPassword"
              />
            </div>
          </div>
          <p class="text-xs text-muted-foreground">
            Use at least 12 characters, including numbers and symbols.
          </p>
          <div class="flex justify-end pt-2">
            <z-button zType="outline" (click)="changePassword()">
              Update password
            </z-button>
          </div>

          <div class="h-px w-full bg-border"></div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Two-factor authentication (2FA)</p>
              <p class="text-xs text-muted-foreground">
                Add an extra layer of security to your account using an
                authenticator app or SMS.
              </p>
            </div>
            <z-switch [(ngModel)]="security.twoFactorEnabled" zSize="sm">
              Enabled
            </z-switch>
          </div>
          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Login alerts</p>
              <p class="text-xs text-muted-foreground">
                Receive an email when a new device logs into your account.
              </p>
            </div>
            <z-switch [(ngModel)]="security.loginAlerts" zSize="sm">
              Enabled
            </z-switch>
          </div>
        </div>
      </z-card>

      <!-- Devices & sessions -->
      <z-card
        zTitle="Devices & sessions"
        zDescription="Manage the devices that are currently logged into your account."
      >
        <div class="space-y-4">
          <p class="text-sm text-muted-foreground">
            This is just a placeholder list. In a real app you’d load this from
            your API.
          </p>
          <div class="space-y-3">
            <div
              class="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p class="text-sm font-medium">Chrome on macOS</p>
                <p class="text-xs text-muted-foreground">
                  Last active: just now · IP: 192.168.0.10
                </p>
              </div>
              <span
                class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-600"
              >
                This device
              </span>
            </div>
            <div
              class="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p class="text-sm font-medium">Safari on iPhone</p>
                <p class="text-xs text-muted-foreground">
                  Last active: 2 days ago · IP: 10.0.0.5
                </p>
              </div>
              <z-button zType="outline" zSize="sm"> Sign out </z-button>
            </div>
          </div>
          <div class="flex justify-end pt-2">
            <z-button zType="destructive" (click)="revokeAllSessions()">
              Sign out of all devices
            </z-button>
          </div>
        </div>
      </z-card>
    </div>
  `,
  styles: ``,
})
export class SecurityComponent {
  onSave = output<{ section: string; data: any }>();

  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true,
  };

  revokeAllSessions() {
    console.log('Revoke all sessions');
  }

  changePassword() {
    console.log('Change password payload:', this.security);
  }
}
