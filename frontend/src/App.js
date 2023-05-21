import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import AppProvider from './context/AppContext';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{
        horizontal:'right',
        vertical: 'top'
      }}>
        <BrowserRouter>
          <AppProvider />
        </BrowserRouter>
      </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App