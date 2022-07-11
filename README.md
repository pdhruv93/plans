# Plans
## Free alternative to Meetup for personal usage

## Other Info
### Google OAuth(One Tap Signin) with MongoDB Atlas
https://www.mongodb.com/docs/atlas/app-services/authentication/google/
```
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

<GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />

const onSuccess = (credentials: CredentialResponse) => {
    getAppUserGoogle(credentials).then((appUser) => {
      ...
    });
	
function getAppUserGoogle(googleCredentialsResponse: CredentialResponse) {
	const credentials = Realm.Credentials.google(googleCredentialsResponse.credential?.toString());
	const user = await getRealmApp().logIn(credentials);
    return user;
}
```

### Facebook OAuth with MongoDB Atlas
https://www.mongodb.com/docs/atlas/app-services/authentication/facebook/
```
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

<FacebookLogin appId='*****' autoLoad={false} fields='name,email,picture' callback={onSuccess} />

const onSuccess = (credentials: ReactFacebookLoginInfo) => {
    getAppUserFacebook(credentials).then((appUser) => {
      ...
    });
  };
	
function getAppUserFacebook(facebookCredentials: ReactFacebookLoginInfo) {
	const credentials = Realm.Credentials.facebook(facebookCredentials.accessToken.toString());
	const user = await getRealmApp().logIn(credentials);
	return user;
}
```

### App Secrets and Login URI
![](screenshots/fb_app_secrets.PNG)
![](screenshots/fb_redirect_uri.PNG)