import { PlanType } from '../../../types';

export interface PlanCardPropsType {
  plan: PlanType;
  updateInProgress: boolean;
  deleteHandler: (planId: string) => void;
  participateHandler: (
    plan: PlanType,
  ) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface PlansListPropsType {
  planId?: string;
}
