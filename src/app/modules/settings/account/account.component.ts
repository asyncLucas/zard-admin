import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, output } from '@angular/core';

import { Theme, ThemeService } from '@app/shared/services/theme.service';
import { ZardCardComponent } from '@app/shared/components/card/card.component';
import { ZardInputDirective } from '@app/shared/components/input/input.directive';
import { ZardButtonComponent } from '@app/shared/components/button/button.component';
import { ZardSelectComponent } from '@app/shared/components/select/select.component';
import { ZardSwitchComponent } from '@app/shared/components/switch/switch.component';
import { ZardSelectItemComponent } from '@app/shared/components/select/select-item.component';
import { ProfileState } from '@app/modules/profile/profile.state';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TimezoneService } from '@app/shared/services/timezone.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-account',
  imports: [
    TranslatePipe,
    FormsModule,
    CommonModule,
    ZardCardComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ZardButtonComponent,
    ZardCardComponent,
    ZardInputDirective,
    ZardSwitchComponent,
    ZardButtonComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
  ],
  template: `
    <div class="grid gap-6 md:grid-cols-[2fr_1.2fr]">
      <!-- Account details -->
      <z-card
        [zTitle]="'PAGE.SETTINGS.ACCOUNT.TITLE' | translate"
        [zDescription]="'PAGE.SETTINGS.ACCOUNT.DESCRIPTION' | translate"
      >
        <div class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.FULL_NAME' | translate }}</label>
              <input
                z-input
                placeholder="Your name"
                [(ngModel)]="profile.fullName"
              />
              <p class="text-xs text-muted-foreground">
                {{ 'PAGE.SETTINGS.ACCOUNT.FULL_NAME.MESSAGE' | translate }}
              </p>
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.USERNAME' | translate }}</label>
              <input
                z-input
                placeholder="username"
                [(ngModel)]="profile.username"
              />
              <p class="text-xs text-muted-foreground">
                {{ 'PAGE.SETTINGS.ACCOUNT.USERNAME.MESSAGE' | translate }}
              </p>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.EMAIL' | translate }}</label>
            <input
              z-input
              type="email"
              placeholder="you@example.com"
              [(ngModel)]="profile.email"
            />
            <p class="text-xs text-muted-foreground">
              {{ 'PAGE.SETTINGS.ACCOUNT.EMAIL.MESSAGE' | translate }}
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.LANGUAGE' | translate }}</label>
              <z-select
                class="w-full"
                zPlaceholder="Select language"
                [(zValue)]="account.language"
                (zValueChange)="setLanguage($event)"
              >
                <z-select-item zValue="en-US">{{ 'English' | translate }}</z-select-item>
                <z-select-item zValue="pt-PT">{{ 'Portuguese (Portugal)' | translate }}</z-select-item>
                <z-select-item zValue="pt-BR">{{ 'Portuguese (Brazil)' | translate }}</z-select-item>
                <z-select-item zValue="es-ES">{{ 'Spanish' | translate }}</z-select-item>
              </z-select>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.TIMEZONE' | translate }}</label>
              <z-select
                class="w-full"
                zPlaceholder="Select time zone"
                [(zValue)]="account.timezone"
                (zValueChange)="timezoneService.setTimezone($event)"
              >
                @for (item of timeZones; track $index) {
                  <z-select-item [zValue]="item">{{ item }}</z-select-item>
                }
              </z-select>
            </div>
          </div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.PUBLIC_PROFILE' | translate }}</p>
              <p class="text-xs text-muted-foreground">
                {{ 'PAGE.SETTINGS.ACCOUNT.PUBLIC_PROFILE.DESCRIPTION' | translate }}
              </p>
            </div>
            <z-switch [(ngModel)]="account.publicProfile" zSize="sm">
              Public
            </z-switch>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <z-button zType="outline" (click)="resetAccount()">{{ 'PAGE.SETTINGS.ACCOUNT.RESET' | translate }}</z-button>
            <z-button (click)="saveSection('account')">{{ 'PAGE.SETTINGS.ACCOUNT.SAVE_CHANGES' | translate }}</z-button>
          </div>
        </div>
      </z-card>

      <!-- Session settings -->
      <z-card
        [zTitle]="'PAGE.SETTINGS.TAB.SESSION_APPEARANCE' | translate"
        [zDescription]="'PAGE.SETTINGS.TAB.SESSION_APPEARANCE.DESCRIPTION' | translate"
      >
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.THEME' | translate }}</label>
            <z-select
              class="w-full"
              [zPlaceholder]="'PAGE.SETTINGS.ACCOUNT.THEME' | translate"
              [(zValue)]="themeService.currentTheme"
              (zValueChange)="setTheme($event)"
            >
              <z-select-item zValue="system">{{ 'PAGE.SETTINGS.ACCOUNT.THEME.SYSTEM' | translate }}</z-select-item>
              <z-select-item zValue="light">{{ 'PAGE.SETTINGS.ACCOUNT.THEME.LIGHT' | translate }}</z-select-item>
              <z-select-item zValue="dark">{{ 'PAGE.SETTINGS.ACCOUNT.THEME.DARK' | translate }}</z-select-item>
            </z-select>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.LANDING_PAGE' | translate }}</label>
            <z-select
              class="w-full"
              [zPlaceholder]="'PAGE.SETTINGS.ACCOUNT.LANDING_PAGE' | translate"
              [(zValue)]="account.landingPage"
            >
              <z-select-item zValue="dashboard">{{ 'PAGE.SETTINGS.ACCOUNT.LANDING_PAGE.DASHBOARD' | translate }}</z-select-item>
              <z-select-item zValue="projects">{{ 'PAGE.SETTINGS.ACCOUNT.LANDING_PAGE.PROJECTS' | translate }}</z-select-item>
              <z-select-item zValue="settings">{{ 'PAGE.SETTINGS.ACCOUNT.LANDING_PAGE.SETTINGS' | translate }}</z-select-item>
            </z-select>
          </div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">{{ 'PAGE.SETTINGS.ACCOUNT.REMEMBER_LAST_TAB' | translate }}</p>
              <p class="text-xs text-muted-foreground">
                {{ 'PAGE.SETTINGS.ACCOUNT.REMEMBER_LAST_TAB.DESCRIPTION' | translate }}
              </p>
            </div>
            <z-switch [(ngModel)]="account.rememberLastTab" zSize="sm">
              {{ 'PAGE.SETTINGS.ACCOUNT.REMEMBER_LAST_TAB' | translate }}
            </z-switch>
          </div>
        </div>
      </z-card>
    </div>
  `,
})
export class AccountComponent {
  onSave = output<{ section: string; data: any }>();
  readonly themeService = inject(ThemeService);
  readonly profileState = inject(ProfileState);
  readonly translate = inject(TranslateService);
  readonly timezoneService = inject(TimezoneService);
  readonly profile = this.profileState.userProfile();

  account = {
    language: 'en-US',
    timezone: 'Europe/Lisbon',
    theme: this.themeService.currentTheme(),
    landingPage: 'dashboard',
    publicProfile: true,
    rememberLastTab: true,
  };

  readonly timeZones = Intl.supportedValuesOf('timeZone');

  setLanguage(language: unknown) {
    this.translate.use(language as string);
    localStorage.setItem('language', language as string);
  }

  setTheme(theme: unknown) {
    this.themeService.setTheme(theme as Theme);
  }

  saveSection(section: string) {
    console.log('Saving section:', section, {
      account: this.account,
    });
    toast.success(this.translate.instant('PAGE.SETTINGS.ACCOUNT.SAVE_SUCCESS'));
    this.onSave.emit({ section, data: this.account });
  }

  resetAccount() {
    this.account = {
      language: 'en',
      timezone: 'Europe/Lisbon',
      theme: 'system',
      landingPage: 'dashboard',
      publicProfile: true,
      rememberLastTab: true,
    };
  }
}
