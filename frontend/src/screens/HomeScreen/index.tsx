import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FAQ from '../../components/FAQ';
import HowItWorks from '../../components/HowItWorks';
import Navbar from '../../components/Navbar';
import PlanCreatorDrawer from '../../components/PlanCreatorDrawer';
import PlansList from '../../components/PlansList';
import PlansSkeleton from '../../components/PlansSkeleton';
import Typography from '@mui/material/Typography';
import styles from './styles/HomeScreen.module.css';
import usePlansStore from '../../store/PlansStore';
import useUserStore from '../../store/UserStore';

function HomeScreen() {
  const { planId } = useParams();
  const { appUser } = useUserStore((state) => ({ appUser: state.appUser }));
  const { plans } = usePlansStore((state) => ({ plans: state.plans }));

  return (
    <Box>
      <Navbar />
      <Box className={styles.bodyContainer}>
        {appUser?.roles?.includes('admin') ? <PlanCreatorDrawer /> : <HowItWorks />}

        <Typography variant='h4' mb={3} mt={6}>
          Upcoming {appUser ? '' : 'Public'} plans
        </Typography>

        {plans.length === 0 && <PlansSkeleton />}
        <PlansList planId={planId} />

        <FAQ />
      </Box>
    </Box>
  );
}

export default HomeScreen;
