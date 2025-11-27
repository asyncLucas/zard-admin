import { Component, output } from '@angular/core';
import { ZardButtonComponent } from "@app/shared/components/button/button.component";
import { ZardSelectComponent } from "@app/shared/components/select/select.component";
import { ZardSelectItemComponent } from "@app/shared/components/select/select-item.component";
import { ZardSwitchComponent } from "@app/shared/components/switch/switch.component";
import { ZardCardComponent } from "@app/shared/components/card/card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [FormsModule, CommonModule, ZardButtonComponent, ZardSelectComponent, ZardSelectItemComponent, ZardSwitchComponent, ZardCardComponent],
  template: `
    <div class="grid gap-6 md:grid-cols-[2fr_1.2fr]">
      <z-card
        zTitle="Email notifications"
        zDescription="Choose what you want to receive in your inbox."
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Product updates</p>
              <p class="text-xs text-muted-foreground">
                New features, improvements, and important announcements.
              </p>
            </div>
            <z-switch [(ngModel)]="notifications.productUpdates" zSize="sm">
              Enabled
            </z-switch>
          </div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Security alerts</p>
              <p class="text-xs text-muted-foreground">
                Password changes, new logins and suspicious activity.
              </p>
            </div>
            <z-switch [(ngModel)]="notifications.securityAlerts" zSize="sm">
              Enabled
            </z-switch>
          </div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Billing</p>
              <p class="text-xs text-muted-foreground">
                Invoices, failed payments and subscription changes.
              </p>
            </div>
            <z-switch [(ngModel)]="notifications.billingEmails" zSize="sm">
              Enabled
            </z-switch>
          </div>
        </div>
      </z-card>

      <z-card
        zTitle="In-app notifications"
        zDescription="Control which events trigger in-app notifications."
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Mentions & comments</p>
              <p class="text-xs text-muted-foreground">
                When someone mentions you or comments on your items.
              </p>
            </div>
            <z-switch [(ngModel)]="notifications.mentions" zSize="sm">
              Enabled
            </z-switch>
          </div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Reminders</p>
              <p class="text-xs text-muted-foreground">
                Task reminders, deadlines and scheduled events.
              </p>
            </div>
            <z-switch [(ngModel)]="notifications.reminders" zSize="sm">
              Enabled
            </z-switch>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium">Notification sound</label>
            <z-select
              class="w-full"
              zPlaceholder="Select sound"
              [(zValue)]="notifications.sound"
            >
              <z-select-item zValue="none">None</z-select-item>
              <z-select-item zValue="soft">Soft</z-select-item>
              <z-select-item zValue="system">System default</z-select-item>
            </z-select>
          </div>

          <div class="flex justify-end pt-2">
            <z-button (click)="saveSection('notifications')">
              Save notification settings
            </z-button>
          </div>
        </div>
      </z-card>
    </div>
  `,
})
export class NotificationsComponent {
  onSave = output<{ section: string; data: any }>();

  notifications = {
    productUpdates: true,
    securityAlerts: true,
    billingEmails: true,
    mentions: true,
    reminders: true,
    sound: 'system',
  };

  saveSection(section: string) {
    console.log('Saving section:', section, {
      notifications: this.notifications,
    });
    this.onSave.emit({ section, data: this.notifications });
  }
}
