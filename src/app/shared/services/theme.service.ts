import { computed, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  readonly currentTheme = signal<Theme>(this.loadSavedTheme());
  readonly effectiveTheme = signal<'light' | 'dark'>('light');

  readonly isLight = computed(() => this.effectiveTheme() === 'light');
  readonly isDark = computed(() => this.effectiveTheme() === 'dark');

  constructor() {
    this.initTheme();
    this.systemDarkQuery.addEventListener('change', (event) => {
      if (this.currentTheme() === 'system') {
        const effective = event.matches ? 'dark' : 'light';
        this.applyTheme('system', effective);
      }
    });
  }

  initTheme(): void {
    const preference = this.currentTheme();
    const effective = this.resolveEffectiveTheme(preference);
    this.applyTheme(preference, effective);
  }

  toggleTheme(): void {
    const current = this.currentTheme();
    const next: Theme =
      current === 'light' ? 'dark' :
      current === 'dark' ? 'system' :
      'light';

    const effective = this.resolveEffectiveTheme(next);
    this.applyTheme(next, effective);
  }

  setTheme(theme: Theme): void {
    const effective = this.resolveEffectiveTheme(theme);
    this.applyTheme(theme, effective);
  }

  private loadSavedTheme(): Theme {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    return 'system';
  }

  private resolveEffectiveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'system') {
      return this.systemDarkQuery.matches ? 'dark' : 'light';
    }
    return theme;
  }

  private applyTheme(theme: Theme, effective: 'light' | 'dark'): void {
    const html = document.documentElement;
    const isDark = effective === 'dark';

    html.classList.toggle('dark', isDark);
    html.setAttribute('data-theme', theme);           // user choice: light/dark/system
    html.setAttribute('data-theme-effective', effective); // actual applied: light/dark
    html.style.colorScheme = isDark ? 'dark' : 'light';
    localStorage.setItem(this.storageKey, theme);
    this.currentTheme.set(theme);
    this.effectiveTheme.set(effective);
  }
}
