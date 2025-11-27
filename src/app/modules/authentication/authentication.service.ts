import { Router } from '@angular/router';
import { inject, Injectable, signal } from '@angular/core';

import { iUser } from './user.interface';
import { injectSupabase } from '@app/shared/functions/inject.supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = injectSupabase();
  private router = inject(Router);

  currentUser = signal<iUser | null>(null);
  isLoggedIn = signal<boolean>(false);

  async load() {
    const { data } = await this.supabase.auth.getSession();
    if (!data.session) {
      return;
    }

    const user = data.session.user as unknown as iUser;
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
  }

  async purgeAndRedirect() {
    await this.supabase.auth.signOut();

    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth']);
  }

  async updateUser(data: Partial<iUser>, id?: string) {
    const { data: user, error } = await this.supabase
      .from('users')
      .update(data)
      .match({ id: id || this.currentUser()?.id })
      .select('*')
      .maybeSingle();

    if (error) throw error;
    this.currentUser.set(user as iUser);
  }
}