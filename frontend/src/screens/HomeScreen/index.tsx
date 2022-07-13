import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import PlanCreatorDrawer from '../../components/PlanCreatorDrawer';
import styles from './styles/HomeScreen.module.css';

function HomeScreen() {
  const { planId } = useParams();

  return (
    <Box>
      <Navbar />
      <Box className={styles.bodyContainer}>
        <PlanCreatorDrawer />
      </Box>
    </Box>
  );
}

export default HomeScreen;
