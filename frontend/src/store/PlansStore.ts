import { PlanInterface, PlansStoreInterface } from '../interfaces';
import create from 'zustand';
import moment from 'moment';

const usePlansStore = create<PlansStoreInterface>((set) => ({
  plans: [],
  setPlans: (plans: PlanInterface[]) =>
    set(() => ({
      plans: plans.sort(
        (plan1, plan2) => moment(plan2.startTime).valueOf() - moment(plan1.startTime).valueOf(),
      ),
    })),
}));

export default usePlansStore;
