import React, { Component } from 'react';
import { getRoles } from './../../../actions/roles';
import { withSnackbar } from '../../../ui/SnackbarContext';
import AddUserComponent from './AddUserComponent';
import { addUser, getUser, editUser } from '../../../actions/users.js';

class AddUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      editMode: props.match.params.userId !== 'add',
      userId: props.match.params.userId,
      user: {},
      isLoading: false,
    }
  }

  componentDidMount() {
    this.fetchRoles();
  }

  onAdd = values => addUser(values);

  onEdit = values => editUser(this.state.userId, values); 

  goBack = () => {
    this.props.history.push('/admin');
  }

  fetchUserData = () => {
    getUser(this.state.userId)
  }

  fetchRoles = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        getRoles()
          .then(res => {
            this.setState({
              roles: res.data,
            });
            if (this.state.editMode) {
              getUser(this.state.userId)
              .then(res => {
                this.setState({
                  user: res.data,
                  isLoading: false
                });
              })
              .catch(error => {
                if (error.response) {
                  this.props.showMessage(error.response.data);
                } else {
                  this.props.showMessage("Unrecognized error");
                }
              });
            } else {
              this.setState({
                isLoading: false,
              })
            }
          })
          .catch(error => {
            if (error.response) {
              this.props.showMessage(error.response.data);
            } else {
              this.props.showMessage("Unrecognized error");
            }
            this.setState({
              isLoading: false,
            })
          });
      }
    );
  }

  render() {
    return (
      <>
        <AddUserComponent
          roles={this.state.roles}
          onAdd={this.onAdd}
          onEdit={this.onEdit}
          goBack={this.goBack}
          editMode={this.state.editMode}
          user={this.state.user}
          isLoading={this.state.isLoading}
        />
      </>
    );
  }
}

export default withSnackbar(AddUserContainer);