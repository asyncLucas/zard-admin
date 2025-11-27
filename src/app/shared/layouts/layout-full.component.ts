import { Component, computed, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLinkWithHref,
  RouterModule,
} from '@angular/router';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import {
  SidebarComponent,
  SidebarGroupComponent,
  SidebarGroupLabelComponent,
} from '../components/layout/sidebar.component';
import { MenuService } from '../services/menu.service';
import { ThemeService } from '../services/theme.service';
import { LoadingService } from '../services/loading.service';
import { ProfileState } from '@app/modules/profile/profile.state';
import { ZardMenuModule } from '../components/menu/menu.module';
import { ZardTooltipModule } from '../components/tooltip/tooltip';
import { ZardIconComponent } from '../components/icon/icon.component';
import { HeaderComponent } from '../components/layout/header.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { ContentComponent } from '../components/layout/content.component';
import { ZardButtonComponent } from '../components/button/button.component';
import { ZardAvatarComponent } from '../components/avatar/avatar.component';
import { ZardDividerComponent } from '../components/divider/divider.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ZardBreadcrumbModule } from '../components/breadcrumb/breadcrumb.module';
import { ZardProgressBarComponent } from '../components/progress-bar/progress-bar.component';

@Component({
  selector: 'z-layout-full',
  standalone: true,
  imports: [
    RouterModule,
    LayoutComponent,
    ContentComponent,
    SidebarComponent,
    SidebarGroupComponent,
    SidebarGroupLabelComponent,
    ZardButtonComponent,
    ZardIconComponent,
    RouterLinkWithHref,
    ZardButtonComponent,
    ZardBreadcrumbModule,
    ZardMenuModule,
    ZardTooltipModule,
    ZardDividerComponent,
    ZardAvatarComponent,
    ZardIconComponent,
    ZardProgressBarComponent,
    AsyncPipe,
    TranslatePipe,
    UpperCasePipe,
    HeaderComponent,
    SplashScreenComponent,
  ],
  template: `
    @defer {
      <z-layout class="border rounded-md h-screen overflow-hidden">
        <z-header>
          <div class="flex items-center justify-between w-full">
            <div
              routerLink="/"
              class="font-semibold text-lg flex items-center cursor-pointer"
            >
              <img
                src="logo.png"
                alt="Logo"
                [class.invert]="themeService.isDark()"
                width="50"
                height="10"
              />
              <!-- <span class="ml-2">Zard Admin <span class="text-sm">Accounting</span></span> -->
            </div>
            <div class="flex items-center gap-2">
              <button z-button zType="ghost" zSize="sm">
                <z-icon zType="search" />
              </button>
              <button z-button zType="ghost" zSize="sm">
                <z-icon zType="bell" />
              </button>
            </div>
          </div>
        </z-header>

        @if (loadingService.loading$ | async) {
          <z-progress-bar
            [progress]="50"
            zShape="circle"
            [zIndeterminate]="true"
          />
        }

        <z-layout>
          <z-sidebar
            [zWidth]="250"
            [zCollapsible]="true"
            [zCollapsed]="sidebarCollapsed()"
            [zCollapsedWidth]="70"
            (zCollapsedChange)="onCollapsedChange($event)"
            class="!p-0"
          >
            <nav
              [class]="
                'flex flex-col h-full overflow-hidden ' +
                (sidebarCollapsed() ? 'gap-1 p-1 pt-4' : 'gap-4 p-4')
              "
            >
              <z-sidebar-group>
                @if (!sidebarCollapsed()) {
                  <z-sidebar-group-label>Main</z-sidebar-group-label>
                }
                @for (item of mainMenuItems(); track item.label) {
                  <button
                    z-button
                    zType="ghost"
                    [class]="sidebarCollapsed() ? 'ml-3' : 'justify-start'"
                    [zTooltip]="sidebarCollapsed() ? (item.translationKey | translate) : ''"
                    zPosition="right"
                    [routerLink]="item.link"
                    routerLinkActive="border primary text-primary"
                  >
                    <z-icon
                      [zType]="item.icon"
                      [class]="sidebarCollapsed() ? 'w-5 h-5 mt-1' : 'mr-2'"
                    ></z-icon>
                    @if (!sidebarCollapsed()) {
                      <span>{{ item.translationKey | translate }}</span>
                    }
                  </button>
                }
              </z-sidebar-group>

              <div class="mt-auto">
                <div
                  z-menu
                  [zMenuTriggerFor]="userMenu"
                  zPlacement="rightBottom"
                  [class]="
                    'flex items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-accent ' +
                    (sidebarCollapsed() ? 'p-0 m-2' : 'p-2')
                  "
                >
                  <z-avatar
                    [zSrc]="userProfile().avatarUrl"
                    [zAlt]="userProfile().fullName"
                  />

                  @if (!sidebarCollapsed()) {
                    <div>
                      <span class="font-medium">{{ userProfile().fullName }}</span>
                      <div class="text-xs">{{ userProfile().email }}</div>
                    </div>

                    <z-icon zType="chevrons-up-down" class="ml-auto" />
                  }
                </div>

                <ng-template #userMenu>
                  <div z-menu-content class="w-48">
                    <button routerLink="/profile" z-menu-item>
                      <z-icon zType="user" class="mr-2" />
                      {{ 'MENU.USERMENU.PROFILE' | translate }}
                    </button>
                    <button (click)="themeService.toggleTheme()" z-menu-item>
                      <z-icon
                        [zType]="themeService.isDark() ? 'sun' : 'moon'"
                        class="mr-2"
                      />
                      {{ 'MENU.USERMENU.SWITCH_THEME' | translate }}
                    </button>
                    <button routerLink="/settings" z-menu-item>
                      <z-icon zType="settings" class="mr-2" />
                      {{ 'MENU.USERMENU.SETTINGS' | translate }}
                    </button>
                    <z-divider zSpacing="sm" />
                    <button routerLink="/auth/sign-in" z-menu-item>
                      <z-icon zType="log-out" class="mr-2" />
                      {{ 'MENU.USERMENU.LOGOUT' | translate }}
                    </button>
                  </div>
                </ng-template>
              </div>
            </nav>
          </z-sidebar>

          <z-content>
            <div class="flex items-center">
              <button
                z-button
                zType="ghost"
                zSize="sm"
                class="-ml-2"
                (click)="toggleSidebar()"
              >
                <z-icon zType="panel-left" />
              </button>

              <z-divider zOrientation="vertical" class="h-4 ml-2" />

              <z-breadcrumb zWrap="wrap" zAlign="start">
                @for (
                  breadcrumb of breadcrumbs();
                  track breadcrumb.url;
                  let isLast = $last
                ) {
                  <z-breadcrumb-item
                    [zLink]="!isLast ? [breadcrumb.url] : null"
                  >
                    @if (isLast) {
                      <span aria-current="page">{{ 'MENU.' + breadcrumb.label | uppercase | translate }}</span>
                    } @else {
                      {{ breadcrumb.label }}
                    }
                  </z-breadcrumb-item>
                }
              </z-breadcrumb>
            </div>

            <div class="space-y-4 py-4 h-full overflow-auto pb-20">
              <router-outlet />
            </div>
          </z-content>
        </z-layout>
      </z-layout>
    } @placeholder (minimum 1500ms) {
      <app-splash-screen />
    }
  `,
})
export class LayoutFullComponent {
  readonly year = new Date().getFullYear();
  private router = inject(Router);
  sidebarCollapsed = signal(false);
  breadcrumbs = signal<{ label: string; url: string }[]>([]);
  readonly themeService = inject(ThemeService);
  readonly loadingService = inject(LoadingService);
  readonly profileState = inject(ProfileState);
  readonly menuService = inject(MenuService);
  mainMenuItems = this.menuService.mainMenuItems;
  userProfile = computed(() => this.profileState.userProfile());

  constructor() {
    this.updateBreadcrumbs();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumbs();
      }
    });
  }

  private updateBreadcrumbs() {
    const urlSegments = this.router.url.split('/').filter((segment) => segment);
    const breadcrumbs: { label: string; url: string }[] = [
      { label: 'Home', url: '/' },
    ];

    let currentPath = '';
    urlSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = this.formatSegmentLabel(segment);
      breadcrumbs.push({ label, url: currentPath });
    });

    this.breadcrumbs.set(breadcrumbs);
  }

  private formatSegmentLabel(segment: string): string {
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
