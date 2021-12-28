import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './Auth';
import * as serviceWorker from './serviceWorker';
import './styles/all-styles.scss';
import 'typeface-roboto';
import { HashRouter, Switch, Route } from 'react-router-dom';
import LoginContainer from './components/login/LoginContainer';
import theme from './ui/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from './ui/SnackbarContext';

ReactDOM.render(
  <HashRouter>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/login" component={LoginContainer} />
          <Auth />
        </Switch>
      </ThemeProvider>
    </SnackbarProvider>
  </HashRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
