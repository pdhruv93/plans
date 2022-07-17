import { useParams } from 'react-router-dom';
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
        {plans.length === 0 && <PlansSkeleton />}
        <PlansList planId={planId} />
      </Box>
    </Box>
  );
}

export default HomeScreen;
