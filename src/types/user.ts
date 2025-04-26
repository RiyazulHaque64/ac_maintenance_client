export interface IUser {
  id: string;
  name: string;
  email: string;
  contact_number: string;
  profile_pic: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
}
