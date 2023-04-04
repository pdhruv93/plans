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
                  title='Can I use it as an app?'
                  body='There is no need to download any separate app, just add the site to your home screen from browser.'
                />

                <StyledAccordion
                  title='How can one see private plans?'
                  body='Private plans are only shown if someone has direct link or they are in attendees list'
                />

                <StyledAccordion
                  title='Create plan option is not visible to me?'
                  body='You need to login in order to create a plan or mark your presence'
                />

                <StyledAccordion
                  title='Why can´t I sign in?'
                  body='Check that your browser allows popups.
                  For iOS users check here Settings > Safari > Disable "Block popups".
                  '
                />

                <StyledAccordion
                  title='Is it mandatory for host to participate?'
                  body='When a plan is created, the host is added as an attendee. 
                  But they can remove their participation later.'
                />

                <StyledAccordion
                  title='How to add or remove participants to plan?'
                  body=' Only plan creator can add or remove participants.
                  Click add participant option at bottom of plan to add user. 
                  To remove the user from plan, click on their avatar.
                  '
                />

                <StyledAccordion
                  title='How to add user who has not logged in yet?'
                  body='To avoid spam, we don´t allow anonymous users.
                  You need to share the link with the person in order to mark their participation.
                  If you are the plan creator, adjust the maximum count accordingly.'
                />

                <StyledAccordion
                  title='How do I turn on notifications?'
                  body='You need to add plans to your Home Screen. You also need to enable browser notifications.
                  Once the plans has been added to your home screen, you can turn on notifications by clicking on the notification icon at the bottom.
                  If you are an iOS user, you need to be using iOS >=16.4'
                />

                <StyledAccordion
                  title='How do I enable browser notifications?'
                  body='For iOS Settings > Safari > Advanced > Experimental Features > Notifications'
                />

                <StyledAccordion
                  title='What kind of notifications do I receive?'
                  body='We don´t spam you with unnecessary notifications.
                  You will only receive notification 1day before for the event where you are participating'
                />

                <StyledAccordion
                  title='What kind of notifications do I receive?'
                  body='We don´t spam you with unnecessary notifications.
                  You will only receive notification 1day before for the event where you are participating'
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
