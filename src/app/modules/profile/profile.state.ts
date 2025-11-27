import { Injectable, signal } from '@angular/core';
import { UserProfile } from './user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileState {
  userProfile = signal<UserProfile>(<UserProfile>{});

  constructor() {
    this.show();
  }

  show() {
    this.userProfile.set({
      id: '1',
      fullName: 'Lucas Silva',
      email: 'lucas@zard.com',
      emailVerified: true,
      avatarUrl: 'https://avatars.githubusercontent.com/u/22208286?v=4',
      initials: 'LS',
      address: '123 Main St, Porto, Portugal',
      phone: '+351 912 345 678',
      company: 'Zard Admin UNIPESSOAL LDA',
      nif: '123456789',
      nipc: '987654321'
    })
  }
}
