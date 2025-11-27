export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  username?: string;
  emailVerified: boolean;
  avatarUrl?: string;
  initials: string;

  address?: string;
  phone?: string;
  company?: string;
  nif?: string;
  nipc?: string;
}
