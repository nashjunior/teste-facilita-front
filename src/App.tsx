import AppRoutes from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/internationalization';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ChakraProvider theme={theme}>
          <AppRoutes />
        </ChakraProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
