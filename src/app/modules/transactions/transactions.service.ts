import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from './Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  readonly #http = inject(HttpClient);

  list() {
    return this.#http.get<Transaction[]>('assets/data/transactions.json');
  }
}
