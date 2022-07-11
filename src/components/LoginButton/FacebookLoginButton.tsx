import { getAppUserFacebook, getSystemUser } from '../../database';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

function FacebookLoginButton() {
  const onSuccess = (credentials: ReactFacebookLoginInfo) => {
    getAppUserFacebook(credentials).then((appUser) => {
      if (credentials) {
        getSystemUser().then((systemUser) => {
          systemUser?.functions
            .createUser(
              appUser?.id,
              credentials.name,
              credentials.email,
              credentials.picture?.data.url,
            )
            .then(() => {
              getAppUserFacebook(credentials).then((appUser) => {
                console.log(appUser?.customData);
              });
            });
        });
      }
    });
  };

  return (
    <FacebookLogin
      appId='452798532903161'
      autoLoad={false}
      fields='name,email,picture'
      callback={onSuccess}
    />
  );
}

export default FacebookLoginButton;
