import {
  TranslateService,
} from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ZardToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ZardToastComponent
],
  template: `
    <router-outlet />
    <z-toaster />
  `,
})
export class AppComponent {
  title = 'Zard Admin';
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en-US', 'pt-PT', 'pt-BR', 'es-ES']);
    this.translate.setFallbackLang('en-US');
    this.translate.use(localStorage.getItem('language') || 'en-US');
  }
}
