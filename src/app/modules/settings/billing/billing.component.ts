import { Component, output } from '@angular/core';
import { ZardSwitchComponent } from '@app/shared/components/switch/switch.component';
import { ZardCardComponent } from '@app/shared/components/card/card.component';
import { ZardButtonComponent } from '@app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { ZardSelectComponent } from "@app/shared/components/select/select.component";
import { ZardSelectItemComponent } from "@app/shared/components/select/select-item.component";
import { CommonModule } from '@angular/common';
import { ZardInputDirective } from '@app/shared/components/input/input.directive';

@Component({
  selector: 'app-billing',
  imports: [
    FormsModule,
    CommonModule,
    ZardSwitchComponent,
    ZardCardComponent,
    ZardButtonComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ZardCardComponent,
    ZardInputDirective,
    ZardSwitchComponent,
    ZardButtonComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
],
  template: `
    <div class="grid gap-6 md:grid-cols-[2fr_1.2fr]">
      <z-card
        zTitle="Billing details"
        zDescription="Information that will appear on your invoices."
      >
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-sm font-medium">Billing name</label>
            <input
              z-input
              placeholder="Company or full name"
              [(ngModel)]="billing.billingName"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium">Billing email</label>
            <input
              z-input
              type="email"
              placeholder="billing@example.com"
              [(ngModel)]="billing.billingEmail"
            />
            <p class="text-xs text-muted-foreground">
              Invoices and receipts will be sent here.
            </p>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium">VAT / Tax number</label>
            <input
              z-input
              placeholder="PT999999999"
              [(ngModel)]="billing.taxId"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium">Billing address</label>
            <textarea
              z-input
              rows="3"
              placeholder="Street, number, city, postal code, country"
              [(ngModel)]="billing.address"
            ></textarea>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <z-button zType="outline" (click)="resetBilling()">Reset</z-button>
            <z-button (click)="saveSection('billing')"
              >Save billing details</z-button
            >
          </div>
        </div>
      </z-card>

      <z-card
        zTitle="Payment methods"
        zDescription="Manage how you pay for your subscription."
      >
        <div class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-sm font-medium">Default payment method</label>
            <z-select
              class="w-full"
              zPlaceholder="Select method"
              [(zValue)]="billing.defaultMethod"
            >
              <z-select-item zValue="card">Credit / debit card</z-select-item>
              <z-select-item zValue="paypal">PayPal</z-select-item>
              <z-select-item zValue="invoice">Manual invoice</z-select-item>
            </z-select>
          </div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Save cards for future payments</p>
              <p class="text-xs text-muted-foreground">
                Securely store your cards for faster checkout.
              </p>
            </div>
            <z-switch [(ngModel)]="billing.saveCards" zSize="sm">
              Enabled
            </z-switch>
          </div>

          <div class="flex items-center justify-between rounded-md border p-3">
            <div>
              <p class="text-sm font-medium">Auto-renew subscription</p>
              <p class="text-xs text-muted-foreground">
                Renew your plan automatically at the end of each cycle.
              </p>
            </div>
            <z-switch [(ngModel)]="billing.autoRenew" zSize="sm">
              Enabled
            </z-switch>
          </div>

          <div class="space-y-2 rounded-md border p-3">
            <p class="text-sm font-medium">Invoices</p>
            <p class="text-xs text-muted-foreground">
              In a real app, you’d list recent invoices here with download
              links.
            </p>
            <z-button zType="outline"> View invoices </z-button>
          </div>
        </div>
      </z-card>
    </div>
  `,
})
export class BillingComponent {
  onSave = output<{ section: string; data: any }>();

  billing = {
    billingName: '',
    billingEmail: '',
    taxId: '',
    address: '',
    defaultMethod: 'card',
    saveCards: true,
    autoRenew: true,
  };

  saveSection(section: string) {
    console.log('Saving section:', section, {
      billing: this.billing,
    });
    this.onSave.emit({ section, data: this.billing });
  }

  resetBilling() {
    this.billing = {
      billingName: '',
      billingEmail: '',
      taxId: '',
      address: '',
      defaultMethod: 'card',
      saveCards: true,
      autoRenew: true,
    };
  }
}
