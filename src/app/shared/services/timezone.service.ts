import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimezoneService {
  readonly timezone = signal<string>('Europe/Lisbon');

  setTimezone(tz: unknown) {
    this.timezone.set(tz as string);
  }

  getTimezone(): string {
    return this.timezone();
  }
}
