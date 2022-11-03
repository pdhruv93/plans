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
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
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
          toast.error(
            error.code === 'auth/account-exists-with-different-credential'
              ? 'You already have an account with this email, try changing the provider'
              : 'Some error Signing in!!',
          );
        });
    });
  };

  return (
    <Stack spacing={2} mt={4}>
      <Button variant='outlined' startIcon={<GoogleIcon />} onClick={() => handleLogin('google')}>
        Login with Google
      </Button>

      <Button
        variant='outlined'
        startIcon={<FacebookIcon />}
        onClick={() => handleLogin('facebook')}
      >
        Login with Facebook
      </Button>
    </Stack>
  );
}
