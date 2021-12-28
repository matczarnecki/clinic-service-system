import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getLoggedUserData } from './actions/users';
import { setAuthorizationToken } from './actions/auth';
import App from './App';

// Klasa ogarniająca logowanie
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      appEnable: false,
    }
  }

  checkToken = () => {
    return localStorage.getItem('Token');
  }

  redirectToLoginPage = () => {
    this.props.history.push("/login");
  }

  // Metoda uruchamiająca się na starcie aplikacji.
  // Jeśli w pamięci nie ma tokena - przekieruj na stronę logowania
  // W przeciwnym wypadku pobierz dane zalogowanego użytkownika - jesli serwer zworoci blad - przekieruj na strone logowania
  componentDidMount() {
    if (!this.checkToken()) {
      this.redirectToLoginPage();
    } else {
      setAuthorizationToken(this.checkToken());
      getLoggedUserData()
        .then(res => {
          this.setState({
            user: res.data,
          }, () => {
            this.setState({
              appEnable: true,
            })
          })
        })
        .catch(err => {
          this.redirectToLoginPage();
        })
    }
  }

  render() {
    return (
      (this.state.appEnable && <App
        user={this.state.user}
      />)
    )
  }
}

export default withRouter(Auth);