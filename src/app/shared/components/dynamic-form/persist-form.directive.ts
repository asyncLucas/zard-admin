import { FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, Directive, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[zPersistForm]',
  standalone: true,
})
export class PersistFormDirective {
  readonly zPersistForm = input<FormGroup | null>(null);
  readonly zPersistFormKey = input<string>('dynamic-form');
  readonly zPersistFormExclude = input<string[]>([]);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const form = this.zPersistForm();
      const key = this.zPersistFormKey();
      const exclude = this.zPersistFormExclude();

      if (!form || !key) return;
      if (typeof window === 'undefined') return; // SSR safety
      
      const stored = window.localStorage.getItem(key);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          
          // Remove excluded fields from restoration
          const sanitizedValues = { ...parsed };
          exclude.forEach((fieldKey) => {
            delete sanitizedValues[fieldKey];
          });
          
          form.patchValue(sanitizedValues, { emitEvent: false });
        } catch {}
      }

      form.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          try {
            // Don't persist excluded fields (like file inputs)
            const valueToPersist = { ...value };
            exclude.forEach((fieldKey) => {
              delete valueToPersist[fieldKey];
            });
            
            window.localStorage.setItem(key, JSON.stringify(valueToPersist));
          } catch {}
        });
    });
  }
}
