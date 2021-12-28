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
      console.log(res)
      this.setState({
        users: res.data
      });
    })
    .catch(error => {
      if (error.response) {
        this.props.showMessage(error.response.data);
      } else {
        this.props.showMessage("Nieznany błąd");
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
        this.props.showMessage("Nieznany błąd");
      }
      this.hideDialog();
    });

  render() {
    return (
      <>
        <UsersComponent
          columns={[
            {
              title: 'Login',
              field: 'username',
            },
            {
              title: 'Imię',
              field: 'firstName',
            },
            {
              title: 'Nazwisko',
              field: 'lastName',
            },
            {
              title: 'Rola',
              field: 'role',
            },
            {
              title: 'Aktywny',
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
          title='Ostrzeżenie'
          onHide={this.hideDialog}
          content="Czy na pewno chcesz dezaktywować konto tego użytkownika?"
          onConfirm={this.onDeactivate}
        />
      </>
    )
  }

}

export default withSnackbar(UsersContainer);