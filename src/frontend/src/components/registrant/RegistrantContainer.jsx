import React, { Component } from "react";
import RegistrantComponent from "./RegistrantComponent";
import { getAppointments, cancelAppointment } from "./../../actions/appointment";
import YesNoDialog from "./../../ui/YesNoDialog";
import { withSnackbar } from "../../ui/SnackbarContext";

class RegistrantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      appointments: [],
      isLoading: false,
      dialogVisible: false,
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

  handleDateChange = (newDate) => {
    this.setState(
      {
        date: newDate,
      },
      () => {
        this.fetchData();
      }
    );
  };

  onAdd = () => {
    this.props.history.push("/registrant/add");
  };

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        getAppointments(this.state.date)
          .then((res) => {
            this.setState({
              appointments: res.data,
              isLoading: false,
            });
          })
          .catch((error) => {
            if (error.response) {
              this.props.showMessage(error.response.data);
            } else {
              this.props.showMessage("Unrecognized error");
            }
          });
      }
    );
  };

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
        <RegistrantComponent
          date={this.state.date}
          handleDateChange={this.handleDateChange}
          columns={[
            {
              title: "Status",
              field: "status",
            },
            {
              title: "Appointment time",
              field: "appointmentTime",
              type: "datetime"
            },
            {
              title: "Doctor first name",
              field: "doctor.firstName",
            },
            {
              title: "Doctor last name",
              field: "doctor.lastName",
            },
            {
              title: "Patient first name",
              field: "patient.firstName",
            },
            {
              title: "Patient last name",
              field: "patient.lastName",
            },
          ]}
          data={this.state.appointments}
          isLoading={this.state.isLoading}
          onAdd={this.onAdd}
          onCancel={(event, rowData) => this.showDialog(rowData)}
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

export default withSnackbar(RegistrantContainer);
