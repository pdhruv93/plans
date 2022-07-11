import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLoginButton from '../LoginButton/FacebookLoginButton';
import GoogleLoginButton from '../LoginButton/GoogleLoginButton';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLoginButton />
      <FacebookLoginButton />
    </GoogleOAuthProvider>
  );
}

export default App;
