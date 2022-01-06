import React, { Component } from "react";
import DoctorsComponent from "./DoctorsComponent";
import { cancelAppointment, getDoctorAppointments } from "../../actions/appointment"
import YesNoDialog from "./../../ui/YesNoDialog";
import { withSnackbar } from "../../ui/SnackbarContext";

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

  fetchData = () => {
    this.fetchAppointments();
  }


  fetchAppointments = () => {
    getDoctorAppointments(this.state.date)
      .then(result => {
        this.setState({
          appointments: result.data,
          isLoading: false
        });
      })
  }

  onCancel = () =>
    cancelAppointment(this.state.selectedAppointmentId)
      .then((res) => {
        this.hideDialog();
        if (res.data) {
          this.props.showMessage(res.data);
        }
      })
      .then(this.fetchData)
      .catch((error) => {
        this.hideDialog();
        if (error.response.data.message) {
          this.props.showMessage(error.response.data.message);
        } else {
          this.props.showMessage("Unrecognized error");
        }
  
      });

  render() {
    return (
      <>
        <DoctorsComponent
          columns={[
            {
              title: "Appointment time",
              field: "appointmentTime",
              type: "datetime"
            },
            {
              title: "Status",
              field: "status"
            },
            {
              title: "Patient first name",
              field: "patient.firstName"
            },
            {
              title: "Patient last name",
              field: "patient.lastName"
            },
            {
              title: "Diagnosis",
              field: "diagnosis",
              emptyValue: '-'
            },
            {
              title: "Description",
              field: "description",
              emptyValue: '-'
            },
          ]}
          actions={[
            rowData => ({
              icon: 'edit',
              tooltip: 'Start appointment',
              onClick: (_event, rowData) => { this.props.history.push(`/doctor/${rowData.id}`) },
              disabled: rowData.status === 'DONE' || rowData.status === 'CANCELLED',
            }),
            rowData => ({
              icon: 'delete',
              tooltip: 'Cancel appointment',
              disabled: rowData.status === 'DONE' || rowData.status === 'CANCELLED',
              onClick: (_event, rowData) => this.showDialog(rowData)
            }),
          ]}
          title={this.state.title}
          data={this.state.appointments}
          isLoading={this.state.isLoading}
          handleDateChange={this.handleDateChange}
          date={this.state.date}
        />
        <YesNoDialog
          visible={this.state.dialogVisible}
          title="Warning"
          onHide={this.hideDialog}
          content="Are you sure you want to cancel this appointment?"
          onConfirm={this.onCancel}
        />
      </>
    );
  }
}

export default withSnackbar(DoctorsContainer);
