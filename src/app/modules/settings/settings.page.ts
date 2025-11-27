import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ZardTabComponent,
  ZardTabGroupComponent,
} from '@app/shared/components/tabs/tabs.component';
import { AboutComponent } from "./about/about.component";
import { AccountComponent } from "./account/account.component";
import { BillingComponent } from "./billing/billing.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { SecurityComponent } from "./security/security.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ZardTabComponent,
    ZardTabGroupComponent,
    AccountComponent,
    SecurityComponent,
    BillingComponent,
    PrivacyComponent,
    NotificationsComponent,
    AboutComponent,
    TranslatePipe
],
  template: `
    <!-- Page header -->
    <!-- <header class="flex flex-col gap-2 border-b pb-4">
          <h1 class="text-2xl font-semibold tracking-tight">
            Settings
          </h1>
          <p class="text-sm text-muted-foreground">
            Manage your account, security, privacy, notifications, billing, and app information.
          </p>
        </header> -->

    <!-- Tabs -->
    <z-tab-group class="w-full">
      <!-- ACCOUNT -->
      <z-tab [label]="'PAGE.SETTINGS.TAB.ACCOUNT' | translate">
        <app-account (onSave)="saveSection($event.section, $event.data)" />
      </z-tab>

      <!-- SECURITY -->
      <z-tab [label]="'PAGE.SETTINGS.TAB.SECURITY' | translate">
        <app-security (onSave)="saveSection($event.section, $event.data)" />
      </z-tab>

      <!-- DATA & PRIVACY -->
      <z-tab [label]="'PAGE.SETTINGS.TAB.DATA_PRIVACY' | translate">
        <app-data-privacy (onSave)="saveSection($event.section, $event.data)" />
      </z-tab>

      <!-- NOTIFICATIONS -->
      <z-tab [label]="'PAGE.SETTINGS.TAB.NOTIFICATIONS' | translate">
        <app-notifications (onSave)="saveSection($event.section, $event.data)" />
      </z-tab>

      <!-- PAYMENT -->
      <z-tab [label]="'PAGE.SETTINGS.TAB.PAYMENT' | translate">
        <app-billing (onSave)="saveSection($event.section, $event.data)" />
      </z-tab>

      <!-- ABOUT -->
      <z-tab [label]="'PAGE.SETTINGS.TAB.ABOUT' | translate">
        <app-about (onSave)="saveSection($event.section, $event.data)" />
      </z-tab>
    </z-tab-group>
  `,
})
export class SettingsPage {
  // Stub handlers – plug these into your API / store
  saveSection(section: string, data: any) {
    console.log('Saving section:', section, data);
  }
}
