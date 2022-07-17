import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { UserInterface } from '../../interfaces';
import { darkTheme } from '../../theme';
import { firebaseApp } from '../../firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useEffect } from 'react';
import AppRoutes from '../../routes';
import useUsersStore from '../../store/UsersStore';

function App() {
  const { setUsers } = useUsersStore((state) => ({
    setUsers: state.setUsers,
  }));

  const getUsers = httpsCallable(getFunctions(), 'getUsers');

  useEffect(() => {
    getUsers().then((result) => {
      if (result.data) {
        setUsers(result.data as UserInterface[]);
      }
    });
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
