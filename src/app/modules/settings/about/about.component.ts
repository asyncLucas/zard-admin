import { toast } from 'ngx-sonner';
import { SwUpdate } from '@angular/service-worker';
import { Component, inject, output } from '@angular/core';

import { environment } from '@environment/environment';
import { ZardButtonComponent } from '@app/shared/components/button/button.component';
import { ZardCardComponent } from '@app/shared/components/card/card.component';
import { ZardSelectComponent } from '@app/shared/components/select/select.component';
import { ZardSelectItemComponent } from '@app/shared/components/select/select-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [
    TranslatePipe,
    ZardButtonComponent,
    ZardCardComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
  ],
  template: `
    <div class="grid gap-6 md:grid-cols-[2fr_1.2fr]">
      <z-card
        [zTitle]="'PAGE.SETTINGS.ABOUT.TITLE' | translate"
        [zDescription]="'PAGE.SETTINGS.ABOUT.DESCRIPTION' | translate"
      >
        <div class="space-y-4 text-sm">
          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-0.5">
              <p class="font-medium text-xs text-muted-foreground uppercase">
                {{ 'PAGE.SETTINGS.ABOUT.APP_NAME' | translate }}
              </p>
              <p>{{ environment.appName }}</p>
            </div>
            <div class="space-y-0.5">
              <p class="font-medium text-xs text-muted-foreground uppercase">
                {{ 'PAGE.SETTINGS.ABOUT.VERSION' | translate }}
              </p>
              <p>{{ environment.version }}</p>
            </div>
            <div class="space-y-0.5">
              <p class="font-medium text-xs text-muted-foreground uppercase">
                {{ 'PAGE.SETTINGS.ABOUT.ENVIRONMENT' | translate }}
              </p>
              <p>{{ environment.production ? 'Production' : 'Development' }}</p>
            </div>
            <div class="space-y-0.5">
              <p class="font-medium text-xs text-muted-foreground uppercase">
                {{ 'PAGE.SETTINGS.ABOUT.RELEASE_CHANNEL' | translate }}
              </p>
              <z-select
                class="w-full"
                [zPlaceholder]="'PAGE.SETTINGS.ABOUT.RELEASE_CHANNEL' | translate"
                [(zValue)]="environment.releaseChannel"
              >
                <z-select-item zValue="stable">{{ 'PAGE.SETTINGS.ABOUT.RELEASE_CHANNEL.STABLE' | translate }}</z-select-item>
                <z-select-item zValue="beta">{{ 'PAGE.SETTINGS.ABOUT.RELEASE_CHANNEL.BETA' | translate }}</z-select-item>
                <z-select-item zValue="dev">{{ 'PAGE.SETTINGS.ABOUT.RELEASE_CHANNEL.DEV' | translate }}</z-select-item>
              </z-select>
            </div>
          </div>

          <p class="text-xs text-muted-foreground">
            {{ 'PAGE.SETTINGS.ABOUT.UPDATE_INFO' | translate }}
          </p>

          <div class="flex gap-2 pt-2">
            <z-button zType="outline" (click)="checkUpdates()">
              {{ 'PAGE.SETTINGS.ABOUT.CHECK_UPDATES' | translate }}
            </z-button>
            <z-button zType="default" (click)="openReleaseNotes()">
              {{ 'PAGE.SETTINGS.ABOUT.VIEW_RELEASE_NOTES' | translate }}
            </z-button>
          </div>
        </div>
      </z-card>

      <z-card [zTitle]="'PAGE.SETTINGS.ABOUT.SUPPORT_TITLE' | translate" [zDescription]="'PAGE.SETTINGS.ABOUT.SUPPORT.DESCRIPTION' | translate">
        <div class="space-y-3 text-sm">
          <p class="text-muted-foreground">
            {{ 'PAGE.SETTINGS.ABOUT.SUPPORT_DESCRIPTION' | translate }}
          </p>
          <ul class="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
            <li>Email: <a href="mailto:{{ environment.supportEmail }}">{{ environment.supportEmail }}</a></li>
            <li>Docs: {{ environment.docsUrl }}</li>
            <li>{{ 'PAGE.SETTINGS.ABOUT.STATUS_PAGE' | translate }}: {{ environment.statusPageUrl }}</li>
          </ul>
          <div class="flex gap-2 pt-2">
            <z-button zType="outline">{{ 'PAGE.SETTINGS.ABOUT.OPEN_DOCUMENTATION' | translate }}</z-button>
            <z-button zType="outline">{{ 'PAGE.SETTINGS.ABOUT.CONTACT_SUPPORT' | translate }}</z-button>
          </div>
        </div>
      </z-card>
    </div>
  `,
})
export class AboutComponent {
  readonly #swUpdate = inject(SwUpdate);
  onSave = output<{ section: string; data: any }>();
  environment = environment;

  checkUpdates() {
    console.log('Checking for updates…');
    if (this.#swUpdate.isEnabled) {
      this.#swUpdate.checkForUpdate().then((hasUpdate) =>
        hasUpdate
          ? window.location.reload()
          : toast.success('Success', {
              description: 'You are already using the latest version.',
            })
      );
    } else {
      toast.info('Info', {
        description: 'You must install the app to check for updates.',
      });
    }
  }

  openReleaseNotes() {
    console.log('Open release notes');
  }
}
