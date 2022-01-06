import React, { Component } from 'react';
import MakeAppointmentComponent from './MakeAppointmentComponent';
import { getAppointment, makeAppointment } from '../../../actions/appointment';
import { withSnackbar } from '../../../ui/SnackbarContext';

class MakeAppointmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentId: props.match.params.appointmentId,
      appointment: {},
      tab: 0,
    }
  }

  componentDidMount = () => {
    this.setState({ isLoading: true },
      () => {
        getAppointment(this.state.appointmentId)
          .then(res => {
            this.setState({
              appointment: res.data,
              isLoading: false,
            });
          })
          .catch(error => {
            this.setState({isLoading: false})
            if (error?.response?.data?.message) {
              this.props.showMessage(error.response.data.message);
            } else {
              this.props.showMessage("Unrecognized error!");
            }
          });
      }
    );
  }

  changeTab = (_, value) => {
    this.setState({
      tab: value,
    });
  }

  makeAppointment = (values) => {
    let body = {
      ...values,
    };
    return makeAppointment(body, this.state.appointmentId);
  }

  goBack = () => {
    this.props.history.push('/doctor');
  }
  render() {
    return (
      <MakeAppointmentComponent
        tab={this.state.tab}
        changeTab={this.changeTab}
        appointment={this.state.appointment}
        makeAppointment={this.makeAppointment}
        goBack={this.goBack}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default withSnackbar(MakeAppointmentContainer);