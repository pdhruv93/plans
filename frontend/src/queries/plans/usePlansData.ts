import {
  CollectionReference,
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { PlanType } from '../../types';
import { db } from '../../firebase';
import { useInfiniteQuery } from '@tanstack/react-query';

const itemsPerPage = 1;

const fetchPlans = ({ pageParam = 1 }): Promise<PlanType[]> => {
  console.log(`Fetching plans from DB for page ${pageParam}.....`);

  /* If pageNumber==1, we don't have starting doc snaphot, so startAt=null */
  const paginateQuery =
    pageParam === 1
      ? query(
          collection(db, 'plans'),
          where('startTime', '>', new Date()),
          orderBy('startTime'),
          limit(itemsPerPage),
        )
      : query(
          collection(db, 'plans'),
          where('startTime', '>', new Date()),
          orderBy('startTime'),
          startAfter((pageParam as any as PlanType).startTime),
          limit(itemsPerPage),
        );

  return getDocs(paginateQuery as CollectionReference<PlanType>).then((snapshot) => {
    const plans = snapshot.docs.map((doc) => ({
      ...doc.data(),
      planId: doc.id,
      startTime: (doc.data().startTime as any as Timestamp).toDate(),
    }));
    return plans;
  });
};

export const usePlansData = () => {
  return useInfiniteQuery(['plans'], fetchPlans, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      // computes and returns the next pageNumber which will be passed to fetchPlans()
      /* If the items returned are less than  itemsPerPage, we are on last page 
        else return the last document on current page which will be used as the starting point
        for next fetch
      */
      return lastPage?.length < itemsPerPage ? undefined : lastPage[lastPage.length - 1];
    },
  });
};
