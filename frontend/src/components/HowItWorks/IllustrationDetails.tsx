import { IllustrationDetailsProps } from './types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styles from './styles/HowItWorks.module.css';

function IllustrationDetails({ illustration, title, description }: IllustrationDetailsProps) {
  return (
    <Stack className={styles.illustration} spacing={1}>
      <img src={illustration} className={styles.image} alt={title} />
      <Typography variant='h6' className={styles.title}>
        {title}
      </Typography>
      <Typography className={styles.description}>{description}</Typography>
    </Stack>
  );
}

export default IllustrationDetails;
