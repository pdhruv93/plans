import { PlanInterface } from '../../interfaces';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
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

function PlansList() {
  const { appUser } = useUserStore((state) => ({ appUser: state.appUser }));
  const { plans, setPlans, getPlansForUser, getPublicPlans } = usePlansStore((state) => ({
    plans: state.plans,
    setPlans: state.setPlans,
    getPlansForUser: state.getPlansForUser,
    getPublicPlans: state.getPublicPlans,
  }));
  const getAllPlans = httpsCallable(getFunctions(), 'getAllPlans');
  const deletePlan = httpsCallable(getFunctions(), 'deletePlan');
  const plansToShow = appUser ? getPlansForUser(appUser.userId) : getPublicPlans();

  useEffect(() => {
    const fetchAllPlansFromDB = async () => {
      const allPlans = await getAllPlans();
      setPlans(allPlans.data as PlanInterface[]);
    };

    fetchAllPlansFromDB();
  }, []);

  const sharePlan = (plan: PlanInterface) => {
    const text = `Hi. There is a plan for ${plan.title} on ${moment(plan.startTime).format(
      'DD.MM.YYYY HH:mm',
    )} (Duration: ${
      plan.duration
    }h). Please inform if you are available. Location: https://maps.google.com/?q=${
      plan.location.coordinates.lat
    },${plan.location.coordinates.lng}
    `;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const deletePlanFromDB = (planId: string) => {
    deletePlan({ planId })
      .then((response) => {
        console.log(response);
        toast.success('Plan deleted successfully!!');
        setPlans(plans.filter((plan) => plan.planId != planId));
      })
      .catch((error) => {
        console.error(error);
        toast.error('Some error deleting plan...');
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Alert severity='info' sx={{ mt: 3, mb: 3 }}>
        Private plans are only shown if you have direct link or are in attendees list
      </Alert>

      <Grid container spacing={2}>
        {plansToShow.map((plan) => (
          <Grid key={plan.planId} item md={3} xs={12}>
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
                  {plan.attendees?.map((attendee) => (
                    <Avatar key={attendee} alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                  ))}
                </AvatarGroup>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormGroup>
                  <FormControlLabel
                    labelPlacement='start'
                    control={<Switch defaultChecked />}
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
