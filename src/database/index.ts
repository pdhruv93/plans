import * as Realm from 'realm-web';
import { CredentialResponse } from '@react-oauth/google';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

function getRealmApp() {
  return new Realm.App({ id: process.env.REACT_APP_MONGODB_APP_ID });
}

export async function getSystemUser() {
  try {
    const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_MONGODB_SYSTEM_API_KEY);
    const user = await getRealmApp().logIn(credentials);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAppUserGoogle(googleCredentialsResponse: CredentialResponse) {
  try {
    if (googleCredentialsResponse.credential) {
      const credentials = Realm.Credentials.google(
        googleCredentialsResponse.credential?.toString(),
      );
      const user = await getRealmApp().logIn(credentials);
      return user;
    } else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAppUserFacebook(facebookCredentials: ReactFacebookLoginInfo) {
  try {
    if (facebookCredentials) {
      const credentials = Realm.Credentials.facebook(facebookCredentials.accessToken.toString());
      const user = await getRealmApp().logIn(credentials);
      return user;
    } else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
