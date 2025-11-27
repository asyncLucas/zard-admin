import { signal, computed } from '@angular/core';

export class PaginationState<T> {
  readonly #items = signal<T[]>([]);
  readonly #totalItems = signal<number>(0);
  readonly currentPage = signal<number>(0);
  readonly pageSize = signal<number>(10);
  readonly numberOfPages = computed(() =>
    Math.floor((this.#totalItems() + this.pageSize() - 1) / this.pageSize())
  );

  readonly paginatedItems = computed(() => {
    const startIndex = this.currentPage() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.#items().slice(startIndex, endIndex);
  });

  constructor(initialItems: T[] = []) {
    this.#items.set(initialItems);
    this.#totalItems.set(initialItems.length);
  }

  set(items: T[]): void {
    this.#items.set(items);
    this.#totalItems.set(items.length);
    this.currentPage.set(0);
  }

  pageSelected(page: number): void {
    this.currentPage.set(page);
  }

  pageSizeSelected(pageSize: number): void {
    this.pageSize.set(pageSize);
  }
}