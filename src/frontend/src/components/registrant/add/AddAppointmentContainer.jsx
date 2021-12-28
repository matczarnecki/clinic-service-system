import React, { Component } from 'react';
import { getDoctors } from './../../../actions/doctors';
import { getPatients, addPatient } from './../../../actions/patients'
import { addAppointment } from './../../../actions/registrant';
import AddAppointmentComponent from './AddAppointmentComponent';
import AddPatientDialogComponent from './AddPatientDialogComponent';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from './../../../ui/SnackbarContext';
import { getAppointments } from "./../../../actions/registrant";
import { isThisHour } from 'date-fns/esm';

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
      DoctorId: '',
      RegistrationDate: new Date(),
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
          patients: res.data.patients,
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
          this.props.showMessage("Nieznany błąd");
        }
      });
  }

  componentDidMount = () => {
    getDoctors()
      .then(res => {
        this.setState({
          doctors: res.data.doctors,
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
          this.props.showMessage("Nieznany błąd");
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
            data: res.data.appointments,
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

  handleDoctorChange = (newValue) => {
    this.setState({
      DoctorId: newValue,
    });
    this.fetchAppointments(this.state.RegistrationDate, newValue.id);
  }

  handleDateChange = (newDate) => {
    if (newDate.getDay() !== this.state.RegistrationDate.getDay()
      || newDate.getMonth() !== this.state.RegistrationDate.getMonth()
      || newDate.getFullYear() !== this.state.RegistrationDate.getFullYear()) {

        this.fetchAppointments(newDate, this.state.DoctorId.id);
    }

    this.setState({
      RegistrationDate: newDate,
    });
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
          DoctorId={this.state.DoctorId}
          RegistrationDate={this.state.RegistrationDate}
          columns={[
            {
              title: "Pacjent",
              field: "patientName",
            },
            {
              title: "Rejestrator",
              field: "registrantName",
            },
            {
              title: "Termin",
              field: "registrationDate",
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