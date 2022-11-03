import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserType } from '../../types';
import { firebaseAuth } from '../../firebase';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useUsersData } from '../../queries/useUsersData';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Stack from '@mui/material/Stack';
import useUserStore from '../../store/UserStore';

export default function LoginButtons() {
  const queryClient = useQueryClient();
  const { addAppUser } = useUserStore((state) => ({
    addAppUser: state.addAppUser,
  }));
  const { data: users } = useUsersData();

  const handleLogin = async (providerType: 'google' | 'facebook') => {
    const provider =
      providerType === 'facebook' ? new FacebookAuthProvider() : new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((response) => {
        const loggedInUser = response.user;
        const loggedInUserDetails = users?.find((user) => user.userId === loggedInUser.uid);

        if (!loggedInUserDetails) {
          // refetch the user details from db as it might be stale
          queryClient.invalidateQueries(['users']);
        }

        addAppUser(
          loggedInUserDetails ||
            ({
              userId: loggedInUser.uid,
              name: loggedInUser.displayName,
              email: loggedInUser.email,
              photoURL: loggedInUser.photoURL,
              roles: ['user'],
            } as UserType),
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.code === 'auth/account-exists-with-different-credential'
            ? 'You already have an account with this email, try changing the provider'
            : 'Some error Signing in!!',
        );
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
