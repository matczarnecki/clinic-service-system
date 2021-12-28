import React, { Component } from "react";
import RegistrantComponent from "./RegistrantComponent";
import { getAppointments } from "./../../actions/registrant";
import { cancelAppointment } from "./../../actions/appointment";
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
              appointments: res.data.appointments,
              isLoading: false,
            });
          })
          .catch((error) => {
            if (error.response) {
              this.props.showMessage(error.response.data);
            } else {
              this.props.showMessage("Nieznany błąd");
            }
          });
      }
    );
  };

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
        <RegistrantComponent
          date={this.state.date}
          handleDateChange={this.handleDateChange}
          columns={[
            {
              title: "Opis",
              field: "description",
            },
            {
              title: "Diagnoza",
              field: "diagnose",
            },
            {
              title: "Status",
              field: "status",
            },
            {
              title: "Data zakończenia/odwołania",
              field: "finishedCancelledDate",
            },
            {
              title: "Lekarz",
              field: "doctorName",
            },
            {
              title: "Pacjent",
              field: "patientName",
            },
            {
              title: "Rejestrator",
              field: "registrantName",
            },
          ]}
          data={this.state.appointments}
          isLoading={this.state.isLoading}
          onAdd={this.onAdd}
          onCancel={(event, rowData) => this.showDialog(rowData)}
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

export default withSnackbar(RegistrantContainer);
