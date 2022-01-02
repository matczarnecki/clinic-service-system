import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Route } from 'react-router-dom';
import UsersContainer from './components/users/UsersContainer';
import Footer from './ui/Footer';
import RegistrantContainer from './components/registrant/RegistrantContainer';
import AddAppointmentContainer from './components/registrant/add/AddAppointmentContainer';
import AddUserContainer from './components/users/add/AddUserContainer';
import { withRouter } from 'react-router-dom'
import { logout } from './actions/auth'
import MakeAppointmentContainer from './components/doctor/appointment/MakeAppointmentContainer';
import DoctorsContainer from './components/doctor/DoctorsContainer';

// tutaj uzupelniac odpowiedni Route w zalezności od roli użytkownika
const createRoutes = (role) => {
  if (role === 'ADM') {
    return (
      <>
        <Route path='/admin' exact component={UsersContainer} />
        <Route path='/admin/:userId' component={AddUserContainer} />
      </>
    );
  } else if (role === "REG") {
    return (
      <>
        <Route path='/registrant' exact component={RegistrantContainer} />
        <Route path='/registrant/add' component={AddAppointmentContainer} />
      </>
    );
  } else if (role === 'DOC') {
    return (
      <>
        <Route path='/doctor' exact component={DoctorsContainer} />
        <Route path='/doctor/:appointmentId' component={MakeAppointmentContainer} />
      </>
    );
  }
}

// na jaką strone przekierować
const redirectByRole = (role) => {
  if (role === 'ADM') {
    return '/admin';
  } else if (role === 'REG') {
    return '/registrant';
  } else if (role === 'DOC') {
    return '/doctor';
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
    this.routes = createRoutes(props.user.role);
    const mainPage = redirectByRole(props.user.role);
    props.history.push(mainPage);
  }

  logoutUser = () => {
    logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="app">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <AppBar position="sticky" className="navbar">
          <Toolbar>
            <Typography variant="h5" style={{ marginLeft: '1%' }}>
              clinic system
            </Typography>
            <IconButton onClick={this.logoutUser} className="right">
              <ExitToAppIcon className="button" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className="content">
          {this.routes}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
