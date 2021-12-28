import React, { Component } from "react";
import DoctorsComponent from "./DoctorsComponent";
import { getAppointments } from "../../actions/doctors";
import { cancelAppointment } from "../../actions/appointment"
import YesNoDialog from "./../../ui/YesNoDialog";
import { withSnackbar } from "../../ui/SnackbarContext";
import { getAppointmentStatuses } from "../../actions/appointmentStatus";

class DoctorsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      appointments: [],
      isLoading: true,
      dialogVisible: false,
      title: "",
      selectedAppointmentId: "",
      statuses: [],
      status: 'REJ',
    };
  }

  showDialog = (appointment) => {
    this.setState({
      dialogVisible: true,
      selectedAppointmentId: appointment.id,
    });
  };

  hideDialog = () => {
    this.setState({
      dialogVisible: false,
      selectedAppointmentId: "",
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleDateChange = newDate => {
    this.setState({
      date: newDate
    },
      () => {
        this.fetchAppointments();
      }
    );
  }

  handleStatusChange = event => {
    this.setState({
      status: event.target.value,
    }, () => {
      this.fetchAppointments();
    });
  }

  fetchData = () => {
    this.fetchStatuses();
    this.fetchAppointments();

  }

  fetchStatuses = () => {
    getAppointmentStatuses()
      .then(res => {
        this.setState({
          statuses: res.data.appointmentStatuses,
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

  fetchAppointments = () => {
    getAppointments(this.state.date, this.state.status)
      .then(result => {
        this.setState({
          appointments: result.data.appointments,
          isLoading: false
        });
      })
  }

  onCancel = () =>
    cancelAppointment(this.state.selectedAppointmentId)
      .then((res) => {
        if (res.data) {
          this.props.showMessage(res.data);
        }
      })
      .then(this.fetchData)
      .catch((error) => {
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
        <DoctorsComponent
          columns={[
            {
              title: "Imie i nazwisko pacjenta",
              field: "patientName"
            },
            {
              title: "Diagnoza",
              field: "diagnose"
            },
            {
              title: "Opis",
              field: "description"
            },
            {
              title: "Status",
              field: "status"
            },
            {
              title: "Data anulowania",
              field: "finishedCancelledDate"
            },
            {
              title: "Imie rejestratorki",
              field: "registrantName"
            }
          ]}
          actions={[
            rowData => ({
              icon: 'edit',
              tooltip: 'Przeprowadź wizytę',
              onClick: (event, rowData) => { this.props.history.push(`/doctor/${rowData.id}`) },
              disabled: rowData.status === 'ZAK' || rowData.status === 'ANU',
            }),
            rowData => ({
              icon: 'delete',
              tooltip: 'Anuluj wizytę',
              disabled: rowData.status === 'ZAK' || rowData.status === 'ANU',
              onClick: (event, rowData) => this.showDialog(rowData)
            }),
          ]}
          title={this.state.title}
          data={this.state.appointments}
          isLoading={this.state.isLoading}
          handleDateChange={this.handleDateChange}
          date={this.state.date}
          statuses={this.state.statuses}
          status={this.state.status}
          handleStatusChange={this.handleStatusChange}
        />
        <YesNoDialog
          visible={this.state.dialogVisible}
          title="Ostrzeżenie"
          onHide={this.hideDialog}
          content="Czy na pewno chcesz anulować tę wizytę?"
          onConfirm={this.onCancel}
        />
      </>
    );
  }
}

export default withSnackbar(DoctorsContainer);
