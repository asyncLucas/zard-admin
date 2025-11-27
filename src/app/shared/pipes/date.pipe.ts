import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';

import { TimezoneService } from '../services/timezone.service';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'tzDate',
  standalone: true,
  pure: false,
})
export class TzDatePipe implements PipeTransform {
  private tz = inject(TimezoneService);
  private translate = inject(TranslateService);
  private datePipe = new DatePipe(this.translate.getCurrentLang() || 'en-US');

  transform(value: any, format: string = 'medium'): string | null {
    if (value == null) return null;
    const timezone = this.tz.timezone();
    const locale = this.translate.currentLang || 'en-US';
    return this.datePipe.transform(value, format, timezone, locale);
  }
}
