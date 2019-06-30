import React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Routes from '../../routes';

const theme = createMuiTheme();

const App = () => (
    <ThemeProvider theme={theme}>
        <Routes />
    </ThemeProvider>
);

export default App;
