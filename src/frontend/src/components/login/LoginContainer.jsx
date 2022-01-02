import React, { Component } from 'react';
import LoginComponent from './LoginComponent';
import { login } from './../../actions/auth';
import { withRouter } from 'react-router-dom';

class LoginContainer extends Component {
  constructor(props) { 
    super();
    this.state = {
      isLoading: false,
    };
  }

  redirectToMainPage = () => {
    this.props.history.push("/");
  }

  log = values => {
    this.setState({
      isLoading: true,
    });
    return login(values);
  }

  disableOverlay = () => {
    this.setState({
      isLoading: false,
    });
  }


  render() {
    return (
      <LoginComponent 
        log={this.log}
        redirectToMainPage={this.redirectToMainPage}
        isLoading={this.state.isLoading}
        disableOverlay={this.disableOverlay}
      />
    )
  }
}

export default withRouter(LoginContainer);