import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserInterface } from '../../interfaces';
import { firebaseAuth } from '../../firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { toast } from 'react-toastify';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import useUserStore from '../../store/UserStore';

export default function LoginButtons() {
  const { addAppUser, setFbAccessToken } = useUserStore((state) => ({
    addAppUser: state.addAppUser,
    setFbAccessToken: state.setFbAccessToken,
  }));
  const getUserDetails = httpsCallable(getFunctions(), 'getUserDetails');

  const handleLogin = async (providerType: 'google' | 'facebook') => {
    const provider =
      providerType === 'facebook' ? new FacebookAuthProvider() : new GoogleAuthProvider();
    const response = await signInWithPopup(firebaseAuth, provider);
    const user = response.user;

    if (providerType === 'facebook') {
      const credential = FacebookAuthProvider.credentialFromResult(response);
      setFbAccessToken(credential?.accessToken);
    }

    getUserDetails({ userId: user.uid })
      .then((result) => {
        const userDetails: UserInterface = result.data as UserInterface;
        addAppUser(
          userDetails || {
            userId: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            roles: ['user'],
          },
        );
      })
      .catch((error) => {
        console.error(error);
        toast('Error Signing you in!!');
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
