import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { GoogleCredentialsInterface } from '../../interfaces';
import { getAppUserGoogle, getSystemUser } from '../../database';
import jwtDecode from 'jwt-decode';

export default function GoogleLoginButton() {
  const onSuccess = (credentials: CredentialResponse) => {
    getAppUserGoogle(credentials).then((appUser) => {
      if (credentials?.credential) {
        const userDetails: GoogleCredentialsInterface = jwtDecode(credentials?.credential);
        getSystemUser().then((systemUser) => {
          systemUser?.functions
            .createUser(appUser?.id, userDetails.name, userDetails.email, userDetails.picture)
            .then(() => {
              getAppUserGoogle(credentials).then((appUser) => {
                console.log(appUser?.customData);
              });
            });
        });
      }
    });
  };

  const onFailure = () => {
    console.log('Login failed!!');
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />;
}
