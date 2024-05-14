import { ThemeProvider } from 'shared/components';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarContainer } from 'shared/modules/snackbar';

import { QueryClientProvider, RoutesProvider } from './providers';

import 'dayjs/locale/de';

dayjs.extend(utcPlugin);

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <SnackbarContainer />
          <RoutesProvider />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
