import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZardCardComponent } from "@app/shared/components/card/card.component";
import { ZardSwitchComponent } from "@app/shared/components/switch/switch.component";
import { ZardButtonComponent } from "@app/shared/components/button/button.component";
import { ZardSelectComponent } from "@app/shared/components/select/select.component";
import { ZardSelectItemComponent } from "@app/shared/components/select/select-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-privacy',
  imports: [FormsModule, CommonModule, ZardCardComponent, ZardSwitchComponent, ZardButtonComponent, ZardSelectComponent, ZardSelectItemComponent],
  template: `
    <div class="grid gap-6 md:grid-cols-[2fr_1.2fr]">
          <z-card
            zTitle="Privacy preferences"
            zDescription="Control how your data is used and who can see your activity."
          >
            <div class="space-y-4">
              <div
                class="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p class="text-sm font-medium">Analytics</p>
                  <p class="text-xs text-muted-foreground">
                    Allow anonymous usage data to help us improve the product.
                  </p>
                </div>
                <z-switch [(ngModel)]="privacy.analytics" zSize="sm">
                  Enabled
                </z-switch>
              </div>

              <div
                class="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p class="text-sm font-medium">Personalized content</p>
                  <p class="text-xs text-muted-foreground">
                    Use your activity to personalize recommendations.
                  </p>
                </div>
                <z-switch [(ngModel)]="privacy.personalizedContent" zSize="sm">
                  Enabled
                </z-switch>
              </div>

              <div
                class="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p class="text-sm font-medium">Marketing emails</p>
                  <p class="text-xs text-muted-foreground">
                    Receive product updates, tips and promotions.
                  </p>
                </div>
                <z-switch [(ngModel)]="privacy.marketingEmails" zSize="sm">
                  Enabled
                </z-switch>
              </div>

              <div class="space-y-1.5">
                <label class="text-sm font-medium">Cookie preferences</label>
                <z-select
                  class="w-full"
                  zPlaceholder="Select cookie level"
                  [(zValue)]="privacy.cookieLevel"
                >
                  <z-select-item zValue="essential"
                    >Only essential cookies</z-select-item
                  >
                  <z-select-item zValue="functional"
                    >Essential + functional</z-select-item
                  >
                  <z-select-item zValue="all">All cookies</z-select-item>
                </z-select>
                <p class="text-xs text-muted-foreground">
                  You can change this at any time. Some features may not work
                  with strict settings.
                </p>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <z-button zType="outline" (click)="resetPrivacy()"
                  >Reset</z-button
                >
                <z-button (click)="saveSection('privacy')"
                  >Save preferences</z-button
                >
              </div>
            </div>
          </z-card>

          <z-card
            zTitle="Your data"
            zDescription="Export or remove your personal data from the application."
          >
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">
                These actions affect the data stored for your account in this
                application.
              </p>

              <div class="space-y-2 rounded-md border p-3">
                <p class="text-sm font-medium">Download a copy of your data</p>
                <p class="text-xs text-muted-foreground">
                  We’ll generate a JSON/CSV export with your profile, activity
                  and settings.
                </p>
                <z-button zType="outline" (click)="exportData()">
                  Request export
                </z-button>
              </div>

              <div
                class="space-y-2 rounded-md border border-destructive/40 bg-destructive/5 p-3"
              >
                <p class="text-sm font-medium text-destructive">
                  Delete account
                </p>
                <p class="text-xs text-muted-foreground">
                  This will permanently delete your account and all associated
                  data. This action cannot be undone.
                </p>
                <z-button zType="destructive" (click)="deleteAccount()">
                  Delete account
                </z-button>
              </div>
            </div>
          </z-card>
        </div>
  `,
  styles: ``
})
export class PrivacyComponent {
  onSave = output<{ section: string; data: any }>();

  privacy = {
    analytics: true,
    personalizedContent: true,
    marketingEmails: true,
    cookieLevel: 'functional',
  };

  saveSection(section: string) {
    console.log('Saving section:', section, {
      privacy: this.privacy,
    });
    this.onSave.emit({ section, data: this.privacy });
  }

  exportData() {
    console.log('Requesting data export');
  }

  deleteAccount() {
    console.log('Requesting account deletion');
  }

  resetPrivacy() {
    this.privacy = {
      analytics: true,
      personalizedContent: true,
      marketingEmails: true,
      cookieLevel: 'functional',
    };
  }
}
