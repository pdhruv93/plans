import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LoginButtons from '../LoginButtons';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import styles from './styles/LoginModal.module.css';

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Link
        onClick={handleOpen}
        href='#'
        underline='none'
        sx={{
          color: 'rgb(33,33,33)',
          fontWeight: '500',
          '&:hover': {
            color: 'rgb(0,130,148)',
          },
        }}
      >
        Login
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modalContainer}>
          <Typography id='modal-modal-title' variant='h4'>
            Login
          </Typography>
          <LoginButtons />
        </Box>
      </Modal>
    </div>
  );
}
