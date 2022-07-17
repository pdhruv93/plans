import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import PlanCreatorDrawer from '../../components/PlanCreatorDrawer';
import PlansList from '../../components/PlansList';
import PlansSkeleton from '../../components/PlansSkeleton';
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
        {appUser?.roles?.includes('admin') && <PlanCreatorDrawer />}

        <Alert severity='info' sx={{ mt: 3, mb: 1 }}>
          Private plans are only shown if you have direct link or are in attendees list
        </Alert>

        {!appUser && (
          <Alert severity='info' sx={{ mt: 1, mb: 3 }}>
            You need to login in order to mark your presence
          </Alert>
        )}

        {plans.length === 0 && <PlansSkeleton />}
        <PlansList planId={planId} />
      </Box>
    </Box>
  );
}

export default HomeScreen;
