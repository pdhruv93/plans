import { UserStoreType } from './types';
import { UserType } from '../../types';
import create from 'zustand';

const useUserStore = create<UserStoreType>((set) => ({
  appUser: null,
  addAppUser: (user: UserType) => set(() => ({ appUser: user })),
  logoutAppUser: () => set(() => ({ appUser: null, fbAccessToken: undefined })),
}));

export default useUserStore;
