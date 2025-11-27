import type { ClassValue } from 'clsx';

import { computed, Directive, ElementRef, HostListener, OnInit, inject, input } from '@angular/core';

import { mergeClasses, transform } from '@shared/utils/merge-classes';
import { inputVariants, type ZardInputVariants } from './input.variants';

@Directive({
  selector: 'input[z-input], textarea[z-input]',
  exportAs: 'zInput',
  standalone: true,
  host: {
    '[class]': 'classes()',
    'data-lpignore': 'true',
    'data-form-type': 'other',
    'data-1p-ignore': '',
  },
})
export class ZardInputDirective implements OnInit {
  readonly elementRef = inject(ElementRef);
  private readonly isTextarea = this.elementRef.nativeElement.tagName.toLowerCase() === 'textarea';

  readonly zBorderless = input(false, { transform });
  readonly zSize = input<ZardInputVariants['zSize']>('default');
  readonly zStatus = input<ZardInputVariants['zStatus']>();

  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    mergeClasses(inputVariants({ zType: !this.isTextarea ? 'default' : 'textarea', zSize: this.zSize(), zStatus: this.zStatus(), zBorderless: this.zBorderless() }), this.class()),
  );

  ngOnInit(): void {
    try {
      const el: HTMLInputElement | HTMLTextAreaElement = this.elementRef.nativeElement;
      const tag = el.tagName.toLowerCase();
      const type = (el as HTMLInputElement).type?.toLowerCase?.() ?? '';
      // Apply readonly-at-load trick to deter aggressive autofill/extensions
      if (tag === 'textarea' || type === 'text' || type === 'number' || type === '') {
        if (!el.hasAttribute('readonly')) {
          el.setAttribute('readonly', '');
        }
      }
    } catch {}
  }

  @HostListener('focus')
  removeReadonlyOnFocus(): void {
    try {
      const el: HTMLInputElement | HTMLTextAreaElement = this.elementRef.nativeElement;
      if (el.hasAttribute('readonly')) {
        // Defer removal to after focus event to avoid extension hook timing
        setTimeout(() => el.removeAttribute('readonly'), 0);
      }
    } catch {}
  }
}
