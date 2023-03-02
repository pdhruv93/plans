import { PlanCardPropsType } from './types';
import { PlanType } from '../../types';
import { firebaseAuth } from '../../firebase';
import { useManageParticipation } from '../../queries/plans/useManageParticipation';
import { useUsersData } from '../../queries/useUsersData';
import AddParticipantModal from '../AddParticipantModal';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import moment from 'moment';

function PlanCard({
  plan,
  updateInProgress,
  deleteHandler,
  participateHandler,
}: PlanCardPropsType) {
  const { data: users } = useUsersData();
  const { mutate: manageParticipation } = useManageParticipation();

  const sharePlan = (plan: PlanType) => {
    const text = `Hi. There is a plan for ${plan.title} on ${moment(plan.startTime).format(
      'DD.MM.YYYY HH:mm',
    )} (Duration: ${plan.duration}h). Mark your presence here: ${
      window.location.href + plan.planId
    }. Location: https://maps.google.com/?q=${plan.location.coordinates.lat},${
      plan.location.coordinates.lng
    }
    `;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (
    plan.isPrivate &&
    (!firebaseAuth.currentUser || !plan.attendees.includes(firebaseAuth.currentUser.uid))
  ) {
    // don't show private plan if user is not logged in or if user is not in attendees
    return null;
  }

  return (
    <Grid key={`plan-${plan.planId}`} item lg={4} md={4} xs={12}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {moment(plan.startTime).format('DD.MM.YYYY HH:mm')}
          </Typography>

          <Typography variant='h5' component='div'>
            {plan.title}
          </Typography>

          <Typography color='text.secondary'>
            {`${plan.charges}€ for ${plan.duration}h (${
              plan.isPrivate ? 'Private' : 'Public'
            } Plan)`}
          </Typography>

          <Typography color='text.secondary'>
            {`Filled: ${plan.attendees?.length || 0}/${plan.maxAttendees}`}
          </Typography>

          <Typography variant='body2'>{plan.otherDetails}</Typography>

          <AvatarGroup total={plan.attendees?.length || 0}>
            {plan.attendees?.map((attendee) => {
              const matchedUser = users?.find((user) => user.userId === attendee);
              return (
                <Tooltip
                  key={`plan-${plan.planId}-attendee-${attendee}`}
                  title={matchedUser?.name || ''}
                  enterTouchDelay={0}
                >
                  <Avatar
                    sx={{ width: '29px', height: '29px' }}
                    alt={matchedUser?.name}
                    src={matchedUser?.photoURL}
                    onClick={() =>
                      firebaseAuth.currentUser &&
                      plan.creator === firebaseAuth.currentUser.uid &&
                      matchedUser?.userId != plan.creator &&
                      manageParticipation({
                        plan,
                        userIdsToRemove: matchedUser ? [matchedUser.userId] : [],
                      })
                    }
                  />
                </Tooltip>
              );
            })}
          </AvatarGroup>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {updateInProgress ? (
            <CircularProgress />
          ) : (
            <FormGroup>
              <FormControlLabel
                labelPlacement='start'
                control={
                  <Switch
                    checked={
                      firebaseAuth.currentUser
                        ? plan.attendees?.includes(firebaseAuth.currentUser?.uid)
                        : false
                    }
                    disabled={
                      firebaseAuth.currentUser === null ||
                      plan.creator === firebaseAuth.currentUser?.uid ||
                      (firebaseAuth.currentUser != null &&
                        !plan.attendees?.includes(firebaseAuth.currentUser?.uid) &&
                        plan.attendees?.length >= plan.maxAttendees)
                    }
                    onChange={participateHandler(plan)}
                  />
                }
                label='Going?'
              />
            </FormGroup>
          )}

          <Box sx={{ display: 'flex' }}>
            <IconButton
              aria-label='location'
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${plan.location.coordinates.lat},${plan.location.coordinates.lng}`,
                  '_blank',
                )
              }
            >
              <LocationOnIcon />
            </IconButton>

            <IconButton aria-label='share' onClick={() => sharePlan(plan)}>
              <ShareIcon />
            </IconButton>

            {firebaseAuth.currentUser?.uid === plan.creator && <AddParticipantModal plan={plan} />}

            {firebaseAuth.currentUser?.uid === plan.creator && (
              <IconButton aria-label='delete' onClick={() => deleteHandler(plan.planId)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default PlanCard;
