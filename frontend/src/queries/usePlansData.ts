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
  writeBatch,
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

export const useManageParticipation = () => {
  const queryClient = useQueryClient();
  return useMutation(manageParticipation, {
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
      toast.error('Some error occured while marking your presence...');
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
