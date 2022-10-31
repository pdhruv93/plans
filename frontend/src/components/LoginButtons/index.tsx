import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserInterface } from '../../interfaces';
import { firebaseAuth } from '../../firebase';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Stack from '@mui/material/Stack';
import useUserStore from '../../store/UserStore';

export default function LoginButtons() {
  const { users, addAppUser } = useUserStore((state) => ({
    users: state.users,
    addAppUser: state.addAppUser,
  }));

  const handleLogin = async (providerType: 'google' | 'facebook') => {
    const provider =
      providerType === 'facebook' ? new FacebookAuthProvider() : new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((response) => {
        const loggedInUser = response.user;
        const loggedInUserDetails = users.find((user) => user.userId === loggedInUser.uid);

        addAppUser(
          loggedInUserDetails ||
            ({
              userId: loggedInUser.uid,
              name: loggedInUser.displayName,
              email: loggedInUser.email,
              photoURL: loggedInUser.photoURL,
              roles: ['user'],
            } as UserInterface),
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
