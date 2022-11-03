import { CollectionReference, collection, getDocs } from 'firebase/firestore';
import { UserType } from '../types';
import { db } from '../firebase';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = () => {
  return getDocs(collection(db, 'users') as CollectionReference<UserType>).then((snapshot) => {
    const users = snapshot.docs.map((doc) => ({ ...doc.data() }));
    return users;
  });
};

export const useUsersData = () => {
  return useQuery(['users'], fetchUsers);
};
