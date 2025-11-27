import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  readonly weekdays = signal<string[]>(
     ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat']
  );

  readonly months = signal<string[]>(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  );
}
