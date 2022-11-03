import Box from '@mui/material/Box';
import FaqSVG from '../../assets/illustrations/faq.svg';
import StyledAccordion from './StyledAccordion';
import Typography from '@mui/material/Typography';
import styles from './styles/HowItWorks.module.css';

function FAQ() {
  return (
    <Box mt={8}>
      <Typography variant='h4' gutterBottom>
        FAQ
      </Typography>

      <Box className={styles.faqContainer}>
        <img src={FaqSVG} className={styles.image} alt='FAQ' />
        <Box ml={4} sx={{ width: '100%' }}>
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
        </Box>
      </Box>
    </Box>
  );
}

export default FAQ;
