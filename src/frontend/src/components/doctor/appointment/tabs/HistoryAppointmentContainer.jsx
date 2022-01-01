import React, { Component } from 'react';
import { getPatientAppointments } from '../../../../actions/appointment';
import HistoryComponent from './HistoryComponent';

class HistoryAppointmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: props.appointment,
      appointments: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    getPatientAppointments(this.state.appointment.patientId)
      .then(res => {
        this.setState({
          appointments: res.data.appointments,
          isLoading: false,
        });
      })
      .catch(error => {
        if (error.response.data) {
          this.props.showMessage(error.response.data);
        }
        else {
          this.props.showMessage("Nieznany błąd");
        }
      });
  }

  render() {
    return (
      <HistoryComponent
        data={this.state.appointments}
        isLoading={this.state.isLoading}
        columns={[
          {
            title: 'Opis',
            field: 'description'
          },
          {
            title: 'Diagnoza',
            field: 'diagnose'
          },
          {
            title: 'Status',
            field: 'status'
          },
          {
            title: 'Data rejestracji',
            field: 'registrationDate'
          },
          {
            title: 'Data ukończenia',
            field: 'finishedCancelledDate'
          },
          {
            title: 'Doktor',
            field: 'doctorName'
          },
        ]}
      />
    )
  }
}

export default HistoryAppointmentContainer;