import React, { Component } from 'react';
import { getDoctors } from './../../../actions/users';
import { getPatients, addPatient } from './../../../actions/patients'
import { addAppointment, getAppointments } from './../../../actions/appointment';
import AddAppointmentComponent from './AddAppointmentComponent';
import AddPatientDialogComponent from './AddPatientDialogComponent';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from './../../../ui/SnackbarContext';

class AddAppointmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      patients: [],
      isLoading: true,
      dialogVisible: false,
      data: [],
      tableLoading: false,
    }
  }

  openDialog = () => {
    this.setState({
      dialogVisible: true,
    });
  }

  closeDialog = () => {
    this.setState({
      dialogVisible: false,
    });
  }

  fetchPatients = () => {
    getPatients()
      .then(res => {
        this.setState({
          patients: res.data,
          isLoading: false,
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        })
        if (error.response) {
          this.props.showMessage(error.response.data);
        } else {
          this.props.showMessage("Unrecognized error");
        }
      });
  }

  componentDidMount = () => {
    getDoctors()
      .then(res => {
        this.setState({
          doctors: res.data,
        }, () => {
          this.fetchPatients();
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        })
        if (error.response) {
          this.props.showMessage(error.response.data);
        } else {
          this.props.showMessage("Unrecognized error");
        }
      });
  }

  fetchAppointments = (date, doctorId) => {
    if (!date || !doctorId) return;

    this.setState({
      tableLoading: true,
    }, () => {
      getAppointments(date, doctorId)
        .then(res => {
          this.setState({
            data: res.data,
            tableLoading: false,
          })
        })
    })
  }

  onSubmit = values => addAppointment(values);

  goBack = () => {
    this.props.history.push('/registrant');
  }

  onAddPatient = values => addPatient(values);

  handleDoctorChange = (registrationDate, newValue) => {
    if (registrationDate && newValue?.id) {
      this.fetchAppointments(registrationDate, newValue.id);
    }
  }

  handleDateChange = (newDate, doctorId) => {
    if (doctorId) {
        this.fetchAppointments(newDate, doctorId);
    }
  }

  render() {
    return (
      <>
        <AddAppointmentComponent
          doctors={this.state.doctors}
          patients={this.state.patients}
          isLoading={this.state.isLoading}
          onSubmit={this.onSubmit}
          goBack={this.goBack}
          openDialog={this.openDialog}
          data={this.state.data}
          tableLoading={this.state.tableLoading}
          fetchAppointments={this.fetchAppointments}
          handleDoctorChange={this.handleDoctorChange}
          handleDateChange={this.handleDateChange}
          columns={[
            {
              title: "Patient first name",
              field: "patient.firstName",
            },
            {
              title: "Patient last name",
              field: "patient.lastName",
            },
            {
              title: "Appointment time",
              field: "appointmentTime",
              type: "datetime",
            },
          ]}
        />
        <AddPatientDialogComponent
          open={this.state.dialogVisible}
          onClose={this.closeDialog}
          onSubmit={this.onAddPatient}
          fetch={this.fetchPatients}
        />
      </>
    );
  }
}

export default withSnackbar(withRouter(AddAppointmentContainer));