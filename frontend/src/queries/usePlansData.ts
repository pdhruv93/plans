import {
  CollectionReference,
  DocumentReference,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { PlanType } from '../types';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

const fetchPlans = (): Promise<PlanType[]> => {
  console.log('Fetching plans from DB.....');
  return getDocs(collection(db, 'plans') as CollectionReference<PlanType>).then((snapshot) => {
    const plans = snapshot.docs.map((doc) => ({ ...doc.data(), planId: doc.id }));
    return plans;
  });
};

const addPlan = (plan: Omit<PlanType, 'planId'>): Promise<PlanType> => {
  return addDoc(collection(db, 'plans'), {
    ...plan,
    startTime: moment.utc(plan.startTime).toISOString(), // was coming incorrect from form
  }).then((docRef) => ({ ...plan, planId: docRef.id }));
};

const toggleParticipation = ({
  plan,
  userId,
  operation,
}: {
  plan: PlanType;
  userId: string;
  operation: 'add' | 'remove';
}): Promise<PlanType> => {
  return updateDoc(doc(db, 'plans', plan.planId), {
    attendees: operation === 'remove' ? arrayRemove(userId) : arrayUnion(userId),
  }).then(() => {
    return getDoc(doc(db, 'plans', plan.planId) as DocumentReference<PlanType>).then((docSnap) => {
      const updatedPlan = docSnap.data()
        ? { ...(docSnap.data() || plan), planId: docSnap.id }
        : plan;

      return updatedPlan;
    });
  });
};

const deletePlan = (planId: string): Promise<string> => {
  return deleteDoc(doc(db, 'plans', planId)).then(() => planId);
};

// ======================================HOOKS BELOW===========================================
export const usePlansData = () => {
  return useQuery(['plans'], fetchPlans, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (plans: PlanType[]) =>
      plans.sort(
        (plan1, plan2) => moment(plan2.startTime).valueOf() - moment(plan1.startTime).valueOf(),
      ),
  });
};

export const useAddPlan = () => {
  const queryClient = useQueryClient();

  return useMutation(addPlan, {
    onSuccess: (addedPlan) => {
      toast.success('Plan added successfully!!');
      // we only get a plan from .then of addPlan(), otherwise null or undefined
      addedPlan &&
        queryClient.setQueryData(
          ['plans'],
          (oldData: PlanType[] | undefined) => (oldData ? [...oldData, addedPlan] : [addedPlan]),
          // if old data exists, append plan else return the only plan
        );
    },

    onError: (error) => {
      console.error('Some error occurred while trying to mark attendance', error);
      toast.error('Some error marking your presence...');
    },
  });
};

export const useToggleParticipation = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleParticipation, {
    onSuccess: (modifiedPlan: PlanType) => {
      // we only get a plan from .then of toggleParticipation(), otheriwse null or undefined
      modifiedPlan &&
        queryClient.setQueryData(['plans'], (oldData: PlanType[] | undefined) => {
          return oldData
            ?.filter((oldPlan) => oldPlan.planId != modifiedPlan.planId)
            .concat(modifiedPlan);
        });
    },

    onError: (error) => {
      console.error('Some error occurred while trying to add plan', error);
      toast.error('Some error creating plan...');
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePlan, {
    onSuccess: (deletedPlanId) => {
      toast.success('Plan deleted successfully!!');
      deletedPlanId &&
        queryClient.setQueryData(['plans'], (oldData: PlanType[] | undefined) =>
          oldData?.filter((plan) => plan.planId != deletedPlanId),
        );
    },

    onError: (error) => {
      console.error('Some error occurred while trying to delete plan', error);
      toast.error('Some error deleting plan...');
    },
  });
};
