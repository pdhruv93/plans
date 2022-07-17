import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import useUserStore from '../../store/UserStore';
import useUsersStore from '../../store/UsersStore';

export default function LoginButtons() {
  const { users } = useUsersStore((state) => ({
    users: state.users,
  }));

  const { addAppUser, setFbAccessToken } = useUserStore((state) => ({
    addAppUser: state.addAppUser,
    setFbAccessToken: state.setFbAccessToken,
  }));

  const handleLogin = async (providerType: 'google' | 'facebook') => {
    const provider =
      providerType === 'facebook' ? new FacebookAuthProvider() : new GoogleAuthProvider();
    const response = await signInWithPopup(firebaseAuth, provider);
    const loggedInUser = response.user;

    if (providerType === 'facebook') {
      const credential = FacebookAuthProvider.credentialFromResult(response);
      setFbAccessToken(credential?.accessToken);
    }

    const loggedInUserDetails = users.find((user) => user.userId === loggedInUser.uid);
    if (loggedInUserDetails) {
      addAppUser(loggedInUserDetails);
    }
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
