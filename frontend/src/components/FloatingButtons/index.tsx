import { firebaseAuth } from '../../firebase';
import Box from '@mui/material/Box';
import FAQ from '../FAQ';
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
      <FAQ />
      {firebaseAuth.currentUser && <PlanCreatorDrawer />}
    </Box>
  );
}
