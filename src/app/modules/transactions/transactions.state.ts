import { computed, inject, Injectable, signal } from '@angular/core';
import { Transaction } from './Transaction';
import { TransactionsService } from './transactions.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsState {
  readonly #transactionsService = inject(TransactionsService);

  constructor() {
    this.#transactionsService.list().subscribe((transactions) => {
      this.#transactions.set(transactions);
    });
  }

  readonly transactions = computed<Transaction[]>(() => this.#transactions().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }));

  readonly #transactions = signal<Transaction[]>([]);

  add(transaction: Transaction) {
    transaction.id = `tx-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')}`;
    this.#transactions.update((txs) => [...txs, transaction]);
  }

  remove(transactionId: string) {
    this.#transactions.update((txs) =>
      txs.filter((tx) => tx.id !== transactionId)
    );
  }
}
