import { Injectable, signal } from '@angular/core';
import { ZardIcon } from '../components/icon/icons';

export interface MenuItem {
  icon: ZardIcon;
  label: string;
  link: string;
  translationKey: string;
  submenu?: { label: string; link: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  readonly mainMenuItems = signal<MenuItem[]>([
    { icon: 'house', label: 'Dashboard', translationKey: 'MENU.DASHBOARD', link: '/dashboard' },
    { icon: 'folder', label: 'Transactions', translationKey: 'MENU.TRANSACTIONS', link: '/transactions' },
    { icon: 'test', label: 'Testing', translationKey: 'MENU.TESTING', link: '/testing' },
    { icon: 'brain', label: 'Mind Maps', translationKey: 'MENU.MIND_MAPS', link: '/mind-maps' },
  ]);
}
