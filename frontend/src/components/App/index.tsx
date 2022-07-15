import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { darkTheme } from '../../theme';
import { firebaseApp } from '../../firebase';
import AppRoutes from '../../routes';

function App() {
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
