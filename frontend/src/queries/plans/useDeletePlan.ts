import { PlanType } from '../../types';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deletePlan = (planId: string): Promise<string> => {
  return deleteDoc(doc(db, 'plans', planId)).then(() => planId);
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePlan, {
    onSuccess: (deletedPlanId) => {
      toast.dismiss();
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
