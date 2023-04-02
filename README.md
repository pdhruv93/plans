# Plans
## Free alternative to Meetup for personal usage

## Other Info

## Common errors
### 403 when deploying functions
xxxxxxx@gcf-admin-robot.iam.gserviceaccount.com does not have storage.objects.create access to the Google Cloud Storage bucket

**Fix**
1. Turn on the Cloud Build API from API and services.
2. Give storage.objects.create persmission to xxxxxxx@gcf-admin-robot.iam.gserviceaccount.com from IAM/Admin-->IAM.
Select Include Google-provided role grants from top right corner.

## Firebase Related

### Initialize the firebase project


### Check logs for a function
firebase functions:log --only createPlan

### Deploy only functions
firebase deploy --only functions

### Deploy only rules
firebase deploy --only firestore:rules

### Hosting
If your firebase app is initialized outside of react app, build the react app separately using
npm run build

Then manually copy the public and build folders to firebase app.
firebase deploy

### Run Local emulator
https://firebase.google.com/docs/functions/local-emulator
https://firebase.google.com/docs/emulator-suite/connect_and_prototype

Go to the backend project where firebase.json is kept
export GOOGLE_APPLICATION_CREDENTIALS="/Users/dhruv.pandey/Downloads/plans-1-d6be5fd67289.json"
firebase init emulators
firebase emulators:start

Run npm run build inside functions folder to detect new functions.
To run function from shell: 
firebase functions:shell
functionName()


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