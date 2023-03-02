import { KeyboardEvent, MouseEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Form from './Form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
      <Fab variant='extended' color='primary' onClick={toggleDrawer()}>
        <AddIcon sx={{ mr: 1 }} />
        New Plan
      </Fab>

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
