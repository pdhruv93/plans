import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { UserInterface } from '../../interfaces';
import { darkTheme } from '../../theme';
import { firebaseAuth } from '../../firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useEffect } from 'react';
import AppRoutes from '../../routes';
import useUserStore from '../../store/UserStore';

function App() {
  const { setUsers, addAppUser } = useUserStore((state) => ({
    setUsers: state.setUsers,
    addAppUser: state.addAppUser,
  }));

  const getUsers = httpsCallable(getFunctions(), 'getUsers');

  useEffect(() => {
    const populateUsers = async () => {
      const response = await getUsers();
      if (response.data) {
        const users = response.data as UserInterface[];
        setUsers(users);

        const loggedInUser = users.find((user) => user.userId === firebaseAuth.currentUser?.uid);
        if (loggedInUser) {
          addAppUser(loggedInUser);
        }
      }
    };

    populateUsers();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <AppRoutes />
          <ToastContainer position='bottom-left' newestOnTop={false} limit={1} />
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
