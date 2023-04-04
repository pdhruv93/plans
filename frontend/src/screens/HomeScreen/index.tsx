import { firebaseAuth } from '../../firebase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FloatingButtons from '../../components/FloatingButtons';
import HowItWorks from '../../components/HowItWorks';
import Navbar from '../../components/Navbar';
import PlansList from '../../components/PlansList';
import Typography from '@mui/material/Typography';
import styles from './styles/HomeScreen.module.css';

function HomeScreen() {
  const { planId } = useParams();
  const [_, setIsUserSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const authStateListener = firebaseAuth.onAuthStateChanged((user) => {
      setIsUserSignedIn(!!user);
    });
    // unsubscribe on component demount
    return () => authStateListener();
  }, []);

  return (
    <Box>
      <Navbar />
      <FloatingButtons />
      <Box className={styles.bodyContainer}>
        {!firebaseAuth.currentUser && <HowItWorks />}

        <Typography variant='h4' mb={3} mt={6}>
          {planId ? 'Plan Details' : `Upcoming ${firebaseAuth.currentUser ? '' : 'Public'} plans`}
        </Typography>

        <PlansList planId={planId} />
      </Box>
    </Box>
  );
}

export default HomeScreen;
