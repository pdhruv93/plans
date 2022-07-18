import { UserInterface, UserStoreInterface } from '../interfaces';
import create from 'zustand';

const useUserStore = create<UserStoreInterface>((set) => ({
  appUser: null,
  users: [],
  fbAccessToken: undefined,
  addAppUser: (user: UserInterface) => set(() => ({ appUser: user })),
  setFbAccessToken: (token: string | undefined) => set(() => ({ fbAccessToken: token })),
  setUsers: (users: UserInterface[]) => set(() => ({ users })),
  logoutAppUser: () => set(() => ({ appUser: null, fbAccessToken: undefined })),
}));

export default useUserStore;
