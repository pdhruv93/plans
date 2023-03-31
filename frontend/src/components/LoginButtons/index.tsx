import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useUsersData } from '../../queries/useUsersData';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton/IconButton';
import Stack from '@mui/material/Stack';

export default function LoginButtons() {
  const queryClient = useQueryClient();
  const { data: users } = useUsersData();

  const handleLogin = async (providerType: 'google' | 'facebook') => {
    const provider =
      providerType === 'facebook' ? new FacebookAuthProvider() : new GoogleAuthProvider();

    setPersistence(firebaseAuth, browserSessionPersistence).then(() => {
      // Ref: https://firebase.google.com/docs/auth/web/auth-state-persistence
      signInWithPopup(firebaseAuth, provider)
        .then(({ user: loggedInUser }) => {
          if (!users?.find((user) => user.userId === loggedInUser.uid)) {
            // logged in user not in local copy of users, refetch as it might be stale
            queryClient.invalidateQueries(['users']);
          }
        })
        .catch((error) => {
          console.error(error);
          error.code !== 'auth/cancelled-popup-request' &&
            toast.error(
              error.code === 'auth/account-exists-with-different-credential'
                ? 'You already have an account with this email, try changing the provider'
                : 'Some error Signing in!!',
            );
        });
    });
  };

  return (
    <Stack direction='row' spacing={1}>
      <IconButton
        color='primary'
        aria-label='google login'
        component='label'
        size='large'
        onClick={() => handleLogin('google')}
      >
        <GoogleIcon />
      </IconButton>

      <IconButton
        color='primary'
        aria-label='facebook login'
        component='label'
        size='large'
        onClick={() => handleLogin('facebook')}
      >
        <FacebookIcon />
      </IconButton>
    </Stack>
  );
}
