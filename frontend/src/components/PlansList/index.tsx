import { PlanType } from '../../types';
import { PlansListPropsType } from './types';
import { Typography } from '@mui/material';
import { firebaseAuth } from '../../firebase';
import { useDeletePlan, useManageParticipation, usePlansData } from '../../queries/usePlansData';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NoPlansSVG from '../../assets/illustrations/no_plans.svg';
import NotFoundSVG from '../../assets/illustrations/not_found.svg';
import PlanCard from './PlanCard';
import PlansSkeleton from '../PlansSkeleton';
import styles from './styles/PlansList.module.css';

function PlansList({ planId }: PlansListPropsType) {
  const { isLoading, isFetching, data: plans } = usePlansData();
  const { mutate: deletePlan } = useDeletePlan();
  const {
    mutate: manageParticipation,
    isLoading: isSwitchLoading,
    data: toggledPlan,
  } = useManageParticipation();

  const deletePlanFromDB = (planId: string) => {
    deletePlan(planId);
  };

  const toggleGoing =
    (plan: PlanType) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      firebaseAuth.currentUser &&
        (checked
          ? manageParticipation({
              plan,
              userIdsToAdd: [firebaseAuth.currentUser.uid],
            })
          : manageParticipation({
              plan,
              userIdsToRemove: [firebaseAuth.currentUser.uid],
            }));
    };

  if (isLoading || isFetching) {
    return <PlansSkeleton />;
  }

  if (plans?.length === 0) {
    return (
      <div className={styles.emptyPlansContainer}>
        <img src={NoPlansSVG} className={styles.image} alt='No Plans' />
        <Typography variant='h5' gutterBottom>
          Its all empty here...
        </Typography>
      </div>
    );
  }

  if (planId) {
    const selectedPlan = plans?.find((plan) => plan.planId === planId);
    return selectedPlan ? (
      <PlanCard
        plan={selectedPlan}
        updateInProgress={toggledPlan?.planId === selectedPlan.planId && isSwitchLoading}
        deleteHandler={deletePlanFromDB}
        participateHandler={toggleGoing}
      />
    ) : (
      <img src={NotFoundSVG} className={styles.image} alt='Not Found' />
    );
  }

  return plans ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.planId}
            plan={plan}
            updateInProgress={toggledPlan?.planId === plan.planId && isSwitchLoading}
            deleteHandler={deletePlanFromDB}
            participateHandler={toggleGoing}
          />
        ))}
      </Grid>
    </Box>
  ) : (
    <img src={NotFoundSVG} className={styles.image} alt='Not Found' />
  );
}

export default PlansList;
