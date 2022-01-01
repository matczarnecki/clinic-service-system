import React, { Component } from 'react';
import UsersComponent from './UsersComponent';
import { getUsers, deactivateUser } from './../../actions/users';
import YesNoDialog from './../../ui/YesNoDialog';
import { withSnackbar } from '../../ui/SnackbarContext';

class UsersContainer extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      dialogVisible: false,
      selectedUserId: '',
    };
  }

  showDialog = (user) => {
    this.setState({
      dialogVisible: true,
      selectedUserId: user.id,
    });
  }

  hideDialog = () => {
    this.setState({
      dialogVisible: false,
      selectedUserId: '',
    })
  }

  fetchData = () => {
    getUsers()
    .then(res => {
      this.setState({
        users: res.data
      });
    })
    .catch(error => {
      if (error.response) {
        this.props.showMessage(error.response.data);
      } else {
        this.props.showMessage("Unrecognized error");
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onAdd = () => {
    this.props.history.push('/admin/add');
  }

  onDeactivate = () => deactivateUser(this.state.selectedUserId)
    .then(res => {
      this.fetchData();
      this.hideDialog();
      if (res.data) {
        this.props.showMessage(res.data);
      }
    })
    .catch(error => {
      if (error.response) {
        this.props.showMessage(error.response.data);
      } else {
        this.props.showMessage("Unrecognized error");
      }
      this.hideDialog();
    });

  render() {
    return (
      <>
        <UsersComponent
          columns={[
            {
              title: 'Username',
              field: 'username',
            },
            {
              title: 'First name',
              field: 'firstName',
            },
            {
              title: 'Last name',
              field: 'lastName',
            },
            {
              title: 'Role',
              field: 'role',
            },
            {
              title: 'Active',
              field: 'active',
              type: 'boolean',
            },
          ]}
          data={this.state.users}
          onAdd={this.onAdd}
          onDeactivate={(event, rowData) => this.showDialog(rowData)}
          onEdit={(event, data) => this.props.history.push(`/admin/${data.id}`) }
        />
        <YesNoDialog
          visible={this.state.dialogVisible}
          title='Warning'
          onHide={this.hideDialog}
          content="Do you really want to disable this user?"
          onConfirm={this.onDeactivate}
        />
      </>
    )
  }

}

export default withSnackbar(UsersContainer);