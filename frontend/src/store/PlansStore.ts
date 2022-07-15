import { PlanInterface, PlansStoreInterface } from '../interfaces';
import create from 'zustand';
import moment from 'moment';

const usePlansStore = create<PlansStoreInterface>((set, get) => ({
  plans: [],
  setPlans: (plans: PlanInterface[]) => set(() => ({ plans })),
  getPlansForUser: (userId: string) =>
    get()
      .plans.filter((plan) => plan.creator === userId || plan.attendees?.includes(userId))
      .sort(
        (plan1, plan2) => moment(plan2.startTime).valueOf() - moment(plan1.startTime).valueOf(),
      ),
  getPublicPlans: () => get().plans.filter((plan) => plan.isPrivate === false),
}));

export default usePlansStore;
