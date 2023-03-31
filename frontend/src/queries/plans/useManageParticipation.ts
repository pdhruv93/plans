import {
  DocumentReference,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  writeBatch,
} from 'firebase/firestore';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlanType } from '../../types';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const manageParticipation = ({
  plan,
  userIdsToAdd = [],
  userIdsToRemove = [],
}: {
  plan: PlanType;
  userIdsToAdd?: string[];
  userIdsToRemove?: string[];
}): Promise<PlanType> => {
  const planRef = doc(db, 'plans', plan.planId);
  const batch = writeBatch(db);
  batch.update(planRef, { attendees: arrayUnion(...userIdsToAdd) });
  batch.update(planRef, { attendees: arrayRemove(...userIdsToRemove) });

  return batch.commit().then(() => {
    return getDoc(doc(db, 'plans', plan.planId) as DocumentReference<PlanType>).then((docSnap) => {
      const updatedPlan = docSnap.data()
        ? { ...(docSnap.data() || plan), planId: docSnap.id }
        : plan;

      return updatedPlan;
    });
  });
};

export const useManageParticipation = () => {
  const queryClient = useQueryClient();
  return useMutation(manageParticipation, {
    onSuccess: (modifiedPlan: PlanType) => {
      // we only get a plan from .then of toggleParticipation(), otheriwse null or undefined
      modifiedPlan &&
        queryClient.setQueryData(['plans'], (oldData: InfiniteData<PlanType[]> | undefined) => {
          oldData?.pages.map((page) =>
            page.map((plan) => {
              if (plan.planId === modifiedPlan.planId) {
                plan.attendees = modifiedPlan.attendees;
              }
            }),
          );

          return oldData;
        });
    },

    onError: (error) => {
      console.error('Some error occurred while trying to mark presence', error);
      toast.error('Some error occured marking your presence...');
    },
  });
};
