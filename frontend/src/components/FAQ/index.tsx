import { KeyboardEvent, MouseEvent, useState } from 'react';
import { Theme } from '@mui/system';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import FaqSVG from '../../assets/illustrations/faq.svg';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import StyledAccordion from './StyledAccordion';
import Typography from '@mui/material/Typography';
import styles from './styles/FAQ.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function FAQ(): JSX.Element {
  const largeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
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
      <Fab variant='extended' onClick={toggleDrawer()}>
        <InfoIcon sx={{ mr: 1 }} />
        FAQ
      </Fab>

      <Drawer
        anchor='bottom'
        sx={{
          '& .MuiPaper-root': {
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          },
        }}
        open={isOpen}
        onClose={toggleDrawer()}
      >
        <Box className='my-drawer' sx={{ p: 5, height: '60vh' }} role='presentation'>
          <Stack direction={largeScreen ? 'row' : 'column'} spacing={3}>
            <Typography variant='h4' gutterBottom>
              FAQ
            </Typography>

            <Stack direction={largeScreen ? 'row' : 'column'} spacing={3}>
              <img src={FaqSVG} className={styles.image} alt='FAQ' />
              <Box sx={{ width: '100%' }}>
                <StyledAccordion
                  title='How can one see private plans?'
                  body='Private plans are only shown if you have direct link or are in attendees list'
                />

                <StyledAccordion
                  title='Create plan option is not visible to me?'
                  body='You need to login in order to create a plan or mark your presence'
                />

                <StyledAccordion
                  title='Is it mandatory for host to participate?'
                  body='As of now, yes. The system by default marks the host as an attendee.'
                />

                <StyledAccordion
                  title='How to add or remove participants to plan?'
                  body='The plan creator has option to add or remove participants. 
            Of course you can mark your presence once you log in. 
            If you are a plan creator just click on an avatar to remove the user from plan'
                />

                <StyledAccordion
                  title='How to add user who has not logged in yet?'
                  body='You cannot add anonymous users as of now. But this feature is releasing soon.'
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
