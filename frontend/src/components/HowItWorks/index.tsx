import { Theme } from '@mui/system';
import Box from '@mui/material/Box';
import GroupSVG from '../../assets/illustrations/group.svg';
import IllustrationDetails from './IllustrationDetails';
import MarkPresenceSVG from '../../assets/illustrations/mark_presence.svg';
import SharePlanSVG from '../../assets/illustrations/share_plan.svg';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styles from './styles/HowItWorks.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';

function HowItWorks() {
  const largeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Box className={styles.container}>
      <Typography variant='h4' gutterBottom>
        How plans works
      </Typography>
      <Typography variant='body1' gutterBottom className={styles.description}>
        Meet new people who share your interests. It’s free to create an account and events.
      </Typography>

      <Stack
        direction={largeScreen ? 'row' : 'column'}
        className={styles.illustrationsContainer}
        spacing={5}
      >
        <IllustrationDetails
          illustration={GroupSVG}
          title='Create a plan'
          description='Login using Google or Facebook to create a plan'
        />

        <IllustrationDetails
          illustration={MarkPresenceSVG}
          title='Attend a plan'
          description='Mark your presence for a plan after signing in'
        />

        <IllustrationDetails
          illustration={SharePlanSVG}
          title='Share a plan'
          description='Share a plan on WhatsApp'
        />
      </Stack>
    </Box>
  );
}

export default HowItWorks;
