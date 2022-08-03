import React from 'react';
import Routes from 'containers/__Routes';

import { Helmet } from 'react-helmet';
// import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import theme from '../../material-theme';
import GlobalStyle from '../../global-styles';

const App = (props) => {
    return (

        <MuiThemeProvider theme={theme}>
            <GlobalStyle />
            <Helmet
                defaultTitle="Crypt Wallet"
            />
            <Routes />
            <ToastContainer position="top-center" />
        </MuiThemeProvider>
    );
}
export default App