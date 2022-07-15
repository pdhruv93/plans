import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import PlanCreatorDrawer from '../../components/PlanCreatorDrawer';
import PlansList from '../../components/PlansList';
import styles from './styles/HomeScreen.module.css';
import useUserStore from '../../store/UserStore';

function HomeScreen() {
  const { appUser } = useUserStore((state) => ({ appUser: state.appUser }));
  const { planId } = useParams();

  return (
    <Box>
      <Navbar />
      <Box className={styles.bodyContainer}>
        {appUser && <PlanCreatorDrawer />}
        <PlansList />
      </Box>
    </Box>
  );
}

export default HomeScreen;
