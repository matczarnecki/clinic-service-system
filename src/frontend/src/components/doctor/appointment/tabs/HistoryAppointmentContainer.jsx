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
    getPatientAppointments(this.state.appointment.id)
      .then(res => {
        this.setState({
          appointments: res.data,
          isLoading: false,
        });
      })
  }

  render() {
    return (
      <HistoryComponent
        data={this.state.appointments}
        isLoading={this.state.isLoading}
        columns={[
          {
            title: 'Description',
            field: 'description',
            emptyValue: '-'
          },
          {
            title: 'Diagnosis',
            field: 'diagnose',
            emptyValue: '-'
          },
          {
            title: 'Status',
            field: 'status'
          },
          {
            title: 'Appointment time',
            field: 'appointmentTime',
            type: "datetime"
          },
          {
            title: 'Doctor first Name',
            field: 'doctor.firstName'
          },
          {
            title: 'Doctor last Name',
            field: 'doctor.lastName'
          },
        ]}
      />
    )
  }
}

export default HistoryAppointmentContainer;