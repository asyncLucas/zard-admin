import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { UserProfile } from './user-profile.model';
import { ZardAvatarComponent } from '@app/shared/components/avatar/avatar.component';
import { ZardBadgeComponent } from '@app/shared/components/badge/badge.component';
import { ZardCardComponent } from '@app/shared/components/card/card.component';
import { ZardIconComponent } from '@app/shared/components/icon/icon.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ZardAvatarComponent,
    ZardBadgeComponent,
    ZardIconComponent,
    ZardCardComponent,
  ],
  template: `
    <div class="flex lg:flex-row md:flex-col gap-4">
      <z-card class="lg:max-w-1/4 md:w-full">
        <!-- Left side: avatar + email + phone -->
        <div class="flex flex-col items-center">
          <z-avatar
            [zSrc]="user.avatarUrl"
            [zFallback]="user.initials"
            [zSize]="200"
          />

          <div class="text-2xl font-semibold my-4">
            {{ user.fullName }}
          </div>

          <div class="flex flex-col gap-2 items-center md:items-start">
            <div class="flex items-center gap-2 text-sm">
              <span class="font-medium break-all">{{ user.email }}</span>

              @if (user.emailVerified) {
                <z-badge
                  zType="secondary"
                  class="inline-flex items-center gap-1 text-xs"
                >
                  <z-icon zType="badge-check" />
                  Verified
                </z-badge>
              }
            </div>

            @if (user.phone; as phone) {
              <div
                class="flex flex-row items-center text-sm text-muted-foreground"
              >
                <z-icon zType="smartphone" />
                <span class="ml-1 font-semibold">Phone:</span>
                <span class="ml-1">{{ phone }}</span>
              </div>
            }
          </div>
        </div>
      </z-card>
      <z-card
        class="lg:max-w-3/4 md:w-full"
        zTitle="Personal Information"
        zDescription="Details about your personal information"
      >
        <!-- Right side: details grid -->
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div class="text-[0.7rem] uppercase text-muted-foreground">
              Address
            </div>
            <div class="font-medium">
              {{ user.address || '—' }}
            </div>
          </div>

          <div>
            <div class="text-[0.7rem] uppercase text-muted-foreground">
              Company
            </div>
            <div class="font-medium">
              {{ user.company || '—' }}
            </div>
          </div>

          <div>
            <div class="text-[0.7rem] uppercase text-muted-foreground">NIF</div>
            <div class="font-medium">
              {{ user.nif || '—' }}
            </div>
          </div>

          <div>
            <div class="text-[0.7rem] uppercase text-muted-foreground">
              NIPC
            </div>
            <div class="font-medium">
              {{ user.nipc || '—' }}
            </div>
          </div>
        </div>
      </z-card>
    </div>
  `,
})
export class UserProfilePageComponent {
  user: UserProfile = {
    id: '1',
    fullName: 'Lucas Silva',
    email: 'lucas@zard.com',
    emailVerified: true,
    avatarUrl: 'https://avatars.githubusercontent.com/u/22208286?v=4',
    initials: 'LS',
    address: 'Rua Exemplo 123, 4560-000, Penafiel, Portugal',
    phone: '+351 912 345 678',
    company: 'Zard Admin',
    nif: '123 456 789',
    nipc: '987 654 321',
  };
}
