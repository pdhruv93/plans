import { PlanInterface, PlansListPropsInterface } from '../../interfaces';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import usePlansStore from '../../store/PlansStore';
import useUserStore from '../../store/UserStore';
import useUsersStore from '../../store/UsersStore';

function PlansList({ planId }: PlansListPropsInterface) {
  const { appUser } = useUserStore((state) => ({ appUser: state.appUser }));
  const { users } = useUsersStore((state) => ({ users: state.users }));
  const { plans, setPlans } = usePlansStore((state) => ({
    plans: state.plans,
    setPlans: state.setPlans,
  }));
  const getPlans = httpsCallable(getFunctions(), 'getPlans');
  const getPlan = httpsCallable(getFunctions(), 'getPlan');
  const deletePlan = httpsCallable(getFunctions(), 'deletePlan');
  const toggleAttendees = httpsCallable(getFunctions(), 'toggleAttendees');

  useEffect(() => {
    if (planId) {
      getPlan({ planId }).then((plan) => {
        if (plan.data) {
          setPlans([plan.data as PlanInterface]);
        } else {
          toast.error('No plan exists with this id!!');
        }
      });
    } else {
      getPlans().then((plans) => {
        if (plans.data) {
          setPlans(plans.data as PlanInterface[]);
        }
      });
    }
  }, [planId]);

  const sharePlan = (plan: PlanInterface) => {
    const text = `Hi. There is a plan for ${plan.title} on ${moment(plan.startTime).format(
      'DD.MM.YYYY HH:mm',
    )} (Duration: ${plan.duration}h). Mark your presence here: http://localhost:3000/${
      plan.planId
    }. Location: https://maps.google.com/?q=${plan.location.coordinates.lat},${
      plan.location.coordinates.lng
    }
    `;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const deletePlanFromDB = (planId: string) => {
    deletePlan({ planId })
      .then(() => {
        toast.success('Plan deleted successfully!!');
        setPlans(plans.filter((plan) => plan.planId != planId));
      })
      .catch((error) => {
        console.error(error);
        toast.error('Some error deleting plan...');
      });
  };

  const toggleGoing = (planId: string) => {
    toggleAttendees({ planId }).then((updatedPlan) => {
      console.log(updatedPlan);
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid key={`plan-${plan.planId}`} item md={3} xs={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                  {`${moment(plan.startTime).format('DD.MM.YYYY HH:mm')} (${plan.duration}h)`}
                </Typography>
                <Typography variant='h5' component='div'>
                  {plan.title}
                </Typography>
                <Typography color='text.secondary'>
                  {plan.isPrivate ? 'Private' : 'Public'}
                </Typography>
                <Typography color='text.secondary'>
                  {`${plan.charges}€ for entire duration`}
                </Typography>
                {plan.maxAttendees && (
                  <Typography color='text.secondary'>
                    {`Max attendees limit: ${plan.maxAttendees}`}
                  </Typography>
                )}

                <Typography variant='body2'>{plan.otherDetails}</Typography>

                <AvatarGroup total={plan.maxAttendees}>
                  {plan.attendees?.map((attendee) => {
                    const matchedUser = users.find((user) => user.userId === attendee);
                    return (
                      <Avatar
                        key={`plan-${plan.planId}-attendee-${attendee}`}
                        alt={matchedUser?.name}
                        src={matchedUser?.photoURL}
                      />
                    );
                  })}
                </AvatarGroup>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormGroup>
                  <FormControlLabel
                    labelPlacement='start'
                    control={
                      <Switch
                        checked={appUser ? plan.attendees?.includes(appUser?.userId) : false}
                        disabled={
                          appUser === null ||
                          plan.creator === appUser?.userId ||
                          (appUser != null &&
                            !plan.attendees?.includes(appUser?.userId) &&
                            plan.maxAttendees >= plan.attendees?.length)
                        }
                        onChange={() => toggleGoing(plan.planId)}
                      />
                    }
                    label='Going?'
                  />
                </FormGroup>

                <Box>
                  <IconButton aria-label='share' onClick={() => sharePlan(plan)}>
                    <ShareIcon />
                  </IconButton>

                  {appUser?.userId === plan.creator && (
                    <IconButton aria-label='share' onClick={() => deletePlanFromDB(plan.planId)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PlansList;
