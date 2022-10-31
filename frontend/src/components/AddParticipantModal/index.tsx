import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react';
import Typography from '@mui/material/Typography';
import UsersList from './UsersList';
import styles from './styles/AddParticipantModal.module.css';

export default function AddParticipantModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label='share' onClick={handleOpen}>
        <PersonAddIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modalContainer}>
          <Typography id='modal-modal-title' variant='h4' gutterBottom>
            Add Participant to plan
          </Typography>
          <Typography id='modal-modal-title' mb={3} sx={{ width: '80%', textAlign: 'center' }}>
            User suggestion will only be shown if the user has logged in atleast once
          </Typography>
          <UsersList />
        </Box>
      </Modal>
    </div>
  );
}
