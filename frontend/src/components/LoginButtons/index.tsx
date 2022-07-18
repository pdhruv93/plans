import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserInterface } from '../../interfaces';
import { firebaseAuth } from '../../firebase';
import { toast } from 'react-toastify';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
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
    <Stack direction='row' spacing={1}>
      <IconButton aria-label='Google Login' onClick={() => handleLogin('google')}>
        <GoogleIcon />
      </IconButton>

      <IconButton aria-label='Facebook Login' onClick={() => handleLogin('facebook')}>
        <FacebookIcon />
      </IconButton>
    </Stack>
  );
}
