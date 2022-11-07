import { PlanType } from '../../types';
import { PlansListPropsType } from './types';
import { Typography } from '@mui/material';
import { firebaseAuth } from '../../firebase';
import { useDeletePlan } from '../../queries/plans/useDeletePlan';
import { useManageParticipation } from '../../queries/plans/useManageParticipation';
import { usePlanData } from '../../queries/plans/usePlanData';
import { usePlansData } from '../../queries/plans/usePlansData';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import NoPlansSVG from '../../assets/illustrations/no_plans.svg';
import NotFoundSVG from '../../assets/illustrations/not_found.svg';
import PlanCard from './PlanCard';
import PlansSkeleton from '../PlansSkeleton';
import React from 'react';
import styles from './styles/PlansList.module.css';

function PlansList({ planId }: PlansListPropsType) {
  const { data: plan } = usePlanData(planId);
  const { isLoading, isFetching, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePlansData();
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

  if (planId) {
    return plan ? (
      <PlanCard
        plan={plan}
        updateInProgress={toggledPlan?.planId === plan.planId && isSwitchLoading}
        deleteHandler={deletePlanFromDB}
        participateHandler={toggleGoing}
      />
    ) : (
      <div className={styles.emptyPlansContainer}>
        <img src={NotFoundSVG} className={styles.image} alt='Not Found' />
        <Typography variant='h5' gutterBottom>
          No such plan found
        </Typography>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return <PlansSkeleton />;
  }

  if (data?.pages[0].length === 0) {
    return (
      <div className={styles.emptyPlansContainer}>
        <img src={NoPlansSVG} className={styles.image} alt='No Plans' />
        <Typography variant='h5' gutterBottom>
          Its all empty here...
        </Typography>
      </div>
    );
  }

  return data ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {data.pages.map((plans, index) => (
          <React.Fragment key={index}>
            {plans.map((plan) => (
              <PlanCard
                key={plan.planId}
                plan={plan}
                updateInProgress={toggledPlan?.planId === plan.planId && isSwitchLoading}
                deleteHandler={deletePlanFromDB}
                participateHandler={toggleGoing}
              />
            ))}
          </React.Fragment>
        ))}
      </Grid>

      <Button
        variant='outlined'
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        Load more...
      </Button>
    </Box>
  ) : (
    <img src={NotFoundSVG} className={styles.image} alt='Not Found' />
  );
}

export default PlansList;
