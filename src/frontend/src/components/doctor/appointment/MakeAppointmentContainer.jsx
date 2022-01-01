import React, { Component } from 'react';
import MakeAppointmentComponent from './MakeAppointmentComponent';
import { getAppointment, makeAppointment } from '../../../actions/appointment';
import { getExaminations } from '../../../actions/examination';
import { addLaboratoryTest } from '../../../actions/laboratoryTest';
import { addPhysicalTest } from '../../../actions/physicalExamination';
import { withSnackbar } from '../../../ui/SnackbarContext';
import { format } from 'date-fns'

class MakeAppointmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentId: props.match.params.appointmentId,
      appointment: {},
      tab: 0,
      laboratoryCodes: [],
      physicalCodes: [],
    }
  }

  componentDidMount = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        Promise.all([getAppointment(this.state.appointmentId), getExaminations('LAB'), getExaminations('PHI')])
          .then(res => {
            this.setState({
              appointment: res[0].data,
              laboratoryCodes: res[1].data.examinations,
              physicalCodes: res[2].data.examinations,
              isLoading: false
            });
          })
          .catch(error => {
            let message = '';
            if (error[0]) {
              message += error[0].response.data;
            } 
            if (error[1]) {
              message += error[1].response.data;
            } 
            if (error[2]) {
              message += error[2].response.data;
            } 
            if (message) {
              this.props.showMessage(message);
            }
            else {
              this.props.showMessage("Nieznany błąd");
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
      FinishedCancelledDate: format(new Date(), 'yyyy-MM-dd'),
    };
    return makeAppointment(body, this.state.appointmentId);
  }

  addLaboratoryTest = (values) => {
    let body = {
      ...values,
      AppointmentId: parseInt(this.state.appointmentId),
      OrderedDate: format(new Date(), 'yyyy-MM-dd'),
    }
    return addLaboratoryTest(body);
  }

  addPhysicalTest = (values) => {
    let body = {
      ...values,
      AppointmentId: parseInt(this.state.appointmentId),
      OrderedDate: format(new Date(), 'yyyy-MM-dd'),
    }
    return addPhysicalTest(body);
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
        addLaboratoryTest={this.addLaboratoryTest}
        addPhysicalTest={this.addPhysicalTest}
        goBack={this.goBack}
        laboratoryCodes={this.state.laboratoryCodes}
        physicalCodes={this.state.physicalCodes}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default withSnackbar(MakeAppointmentContainer);