import { UserType } from '../../../types';

export interface UserStoreType {
  appUser: UserType | null;
  addAppUser: (userDetails: UserType) => void;
  logoutAppUser: () => void;
}
