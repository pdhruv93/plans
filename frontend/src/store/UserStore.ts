import { UserInterface, UserStoreInterface } from '../interfaces';
import create from 'zustand';

const useUserStore = create<UserStoreInterface>((set) => ({
  appUser: null,
  users: [],
  addAppUser: (user: UserInterface) => set(() => ({ appUser: user })),
  setUsers: (users: UserInterface[]) => set(() => ({ users })),
  logoutAppUser: () => set(() => ({ appUser: null, fbAccessToken: undefined })),
}));

export default useUserStore;
