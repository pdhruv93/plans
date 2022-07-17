import { UserInterface, UsersStoreInterface } from '../interfaces';
import create from 'zustand';

const useUsersStore = create<UsersStoreInterface>((set) => ({
  users: [],
  setUsers: (users: UserInterface[]) => set(() => ({ users })),
}));

export default useUsersStore;
