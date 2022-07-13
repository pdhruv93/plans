import { KeyboardEvent, MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Form from './Form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styles from './styles/PlanCreatorDrawer.module.css';

export default function UserProfileDrawer(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Box className={styles.createPlanBtn}>
        <Button variant='contained' onClick={toggleDrawer()}>
          New Plan
        </Button>
      </Box>

      <Drawer anchor='right' open={isOpen} onClose={toggleDrawer()}>
        <Box sx={{ p: 5, width: { xs: 280, md: 380 } }} role='presentation'>
          <Typography variant='h5' sx={{ mb: 2 }} gutterBottom component='div'>
            Create a new Plan
          </Typography>

          <Stack spacing={6}>
            <Form />
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
