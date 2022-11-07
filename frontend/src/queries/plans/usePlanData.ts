import { DocumentReference, Timestamp, doc, getDoc } from 'firebase/firestore';
import { PlanType } from '../../types';
import { db } from '../../firebase';
import { useQuery } from '@tanstack/react-query';

const fetchPlan = (planId: string | undefined): Promise<PlanType | null> | null => {
  console.log('Fetching plans from DB.....');
  return planId
    ? getDoc(doc(db, 'plans', planId) as DocumentReference<PlanType>).then((docSnap) =>
        docSnap.exists()
          ? {
              ...docSnap.data(),
              planId: docSnap.id,
              startTime: (docSnap.data().startTime as any as Timestamp).toDate(),
            }
          : null,
      )
    : null;
};

export const usePlanData = (planId: string | undefined) => {
  return useQuery(['plan', planId], () => fetchPlan(planId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
