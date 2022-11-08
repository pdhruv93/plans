import {
  CollectionReference,
  QueryConstraint,
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

const itemsPerPage = 6;

const fetchPlans = ({ pageParam = 1 }): Promise<PlanType[]> => {
  console.log(`Fetching plans from DB for page ${pageParam}.....`);

  const constraints: QueryConstraint[] = [];
  constraints.push(where('startTime', '>', new Date()));
  constraints.push(orderBy('startTime'));

  /* If pageNumber==1, we don't have starting doc snaphot, so dont pass startAt*/
  pageParam != 1 && constraints.push(startAfter((pageParam as any as PlanType).startTime));

  constraints.push(limit(itemsPerPage));

  return getDocs(
    query(collection(db, 'plans'), ...constraints) as CollectionReference<PlanType>,
  ).then((snapshot) => {
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
    keepPreviousData: true,
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
