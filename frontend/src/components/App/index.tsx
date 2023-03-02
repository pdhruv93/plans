import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { darkTheme } from '../../theme';
import AppRoutes from '../../routes';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <AppRoutes />
            <ToastContainer position='bottom-left' />
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
    </QueryClientProvider>
  );
}

export default App;
