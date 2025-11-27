import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Component, effect, inject } from '@angular/core';

import { Transaction } from '../Transaction';
import { TzDatePipe } from '@app/shared/pipes/date.pipe';
import { TransactionsState } from '../transactions.state';
import { PaginationState } from '@app/shared/utils/pagination.state';
import { ZardTableModule } from '@app/shared/components/table/table.module';
import { ZardCardComponent } from "@app/shared/components/card/card.component";
import { ZardIconComponent } from '@app/shared/components/icon/icon.component';
import { ZardDialogService } from '@app/shared/components/dialog/dialog.service';
import { ZardBadgeComponent } from '@app/shared/components/badge/badge.component';
import { ZardButtonComponent } from '@app/shared/components/button/button.component';
import { NewTransactionPage as NewTransactionComponent } from '../new/new.component';
import { ZardPaginationComponent } from "@app/shared/components/pagination/pagination.component";

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    FormsModule,
    ZardTableModule,
    ZardButtonComponent,
    ZardIconComponent,
    CurrencyPipe,
    TzDatePipe,
    TranslatePipe,
    ZardBadgeComponent,
    ZardPaginationComponent,
    ZardCardComponent
],
  template: `
    <z-card [zTitle]="'MENU.TRANSACTIONS' | translate" class="w-full space-y-4">
      <div class="flex items-center justify-end gap-4">
        <z-button (click)="addTransaction()" title="Add transaction">
          <div z-icon zType="plus"></div>
          Add
        </z-button>
      </div>
      <table z-table>
        <caption>
        </caption>
        <thead z-table-header>
          <tr z-table-row>
            <th z-table-head>Seller</th>
            <th z-table-head>Amount</th>
            <th z-table-head>Date</th>
            <th z-table-head>File</th>
          </tr>
        </thead>
        <tbody z-table-body>
          @for (data of pagination.paginatedItems(); track data.id) {
            <tr z-table-row>
              <td z-table-cell>{{ data.seller }}</td>
              <td z-table-cell>
                {{ data.amount | currency: 'EUR' : 'symbol' : '1.2-2' }}
              </td>
              <td z-table-cell>{{ data.date | tzDate : 'mediumDate' }}</td>
              <td z-table-cell>
                <z-badge (click)="previewFile(data)" zType="secondary" class="cursor-pointer">
                  <z-icon zType="paperclip" />
                  File
                </z-badge>
              </td>
            </tr>
          } @empty {
            <tr z-table-row>
              <td z-table-cell [attr.colspan]="4" class="h-24 text-center">
                No results.
              </td>
            </tr>
          }
        </tbody>
      </table>
      <z-pagination 
        [zPageIndex]="pagination.currentPage() + 1" 
        [zTotal]="pagination.numberOfPages()" 
        (zPageIndexChange)="pagination.pageSelected($event)"
      />
    </z-card>
  `,
})
export class ListTransactionsPage {
  readonly #transactionsState = inject(TransactionsState);
  readonly #dialogService = inject(ZardDialogService);
  pagination = new PaginationState<Transaction>();

  constructor() {
    effect(() => {
      this.pagination = new PaginationState<Transaction>(this.#transactionsState.transactions());
    });
  }

  previewFile(tx: Transaction): void {
    if (tx.fileUrl) {
      window.open(tx.fileUrl, '_blank');
    }
  }

  addTransaction(): void {
    this.#dialogService.create({
      zTitle: 'Add Transaction',
      zContent: NewTransactionComponent,
      zOkText: 'Save changes',
      zWidth: '400px',
      zOnOk: (instance) => {
        if (instance.form.invalid) {
          instance.form.markAllAsTouched();
          toast.error('Ops', {
            description:
              'Form is invalid. Please check the fields and try again.',
          });
          return;
        }

        this.#transactionsState.add(instance.form.value);
      },
    });
  }
}
