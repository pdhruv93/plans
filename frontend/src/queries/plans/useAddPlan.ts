import { PlanType } from '../../types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const addPlan = (plan: Omit<PlanType, 'planId'>): Promise<PlanType> => {
  return addDoc(collection(db, 'plans'), plan).then((docRef) => ({ ...plan, planId: docRef.id }));
};

export const useAddPlan = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(addPlan, {
    onSuccess: (addedPlan) => {
      toast.success('Plan added successfully!!');
      navigate(`/${addedPlan.planId}`);
      queryClient.invalidateQueries(['plans']);
    },

    onError: (error) => {
      console.error('Some error occurred while adding the plan', error);
      toast.error('Some error adding the plan...');
    },
  });
};
