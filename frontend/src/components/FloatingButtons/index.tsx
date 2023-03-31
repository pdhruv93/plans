import { firebaseAuth } from '../../firebase';
import { requestForToken } from '../../firebase/notifications';
import Box from '@mui/material/Box';
import FAQ from '../FAQ';
import Fab from '@mui/material/Fab/Fab';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PlanCreatorDrawer from '../PlanCreatorDrawer';

export default function FloatingButtons() {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        zIndex: 2,
        bottom: '16px',
        right: '16px',
        '& > :not(style)': { m: 1 },
      }}
    >
      {firebaseAuth.currentUser && (
        <Fab variant='extended' onClick={() => requestForToken()}>
          <NotificationsActiveIcon sx={{ mr: 1 }} />
        </Fab>
      )}
      <FAQ />
      {firebaseAuth.currentUser && <PlanCreatorDrawer />}
    </Box>
  );
}
