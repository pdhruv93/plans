import { UserInterface, UserStoreInterface } from '../interfaces';
import { devtools, persist } from 'zustand/middleware';
import create from 'zustand';

const useUserStore = create<UserStoreInterface>()(
  devtools(
    persist(
      (set) => ({
        appUser: null,
        fbAccessToken: undefined,
        addAppUser: (user: UserInterface) => set(() => ({ appUser: user })),
        setFbAccessToken: (token: string | undefined) => set(() => ({ fbAccessToken: token })),
        logoutAppUser: () => set(() => ({ appUser: null })),
      }),
      { name: 'plans-app-user', getStorage: () => sessionStorage },
    ),
  ),
);

export default useUserStore;
