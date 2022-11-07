import { firebaseAuth } from '../../firebase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FAQ from '../../components/FAQ';
import HowItWorks from '../../components/HowItWorks';
import Navbar from '../../components/Navbar';
import PlanCreatorDrawer from '../../components/PlanCreatorDrawer';
import PlansList from '../../components/PlansList';
import Typography from '@mui/material/Typography';
import styles from './styles/HomeScreen.module.css';

function HomeScreen() {
  const { planId } = useParams();
  const [_, setIsUserSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const authStateListener = firebaseAuth.onAuthStateChanged((user) => setIsUserSignedIn(!!user));
    // unsubscribe on component demount
    return () => authStateListener();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box className={styles.bodyContainer}>
        {firebaseAuth.currentUser ? <PlanCreatorDrawer /> : <HowItWorks />}

        <Typography variant='h4' mb={3} mt={6}>
          {planId ? 'Plan Details' : `Upcoming ${firebaseAuth.currentUser ? '' : 'Public'} plans`}
        </Typography>

        <PlansList planId={planId} />

        <FAQ />
      </Box>
    </Box>
  );
}

export default HomeScreen;
