import React, { Component } from 'react';
import { getPatientPhysicalTests } from '../../../../actions/physicalExamination';
import HistoryComponent from './HistoryComponent';

class HistoryPhysicalTestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: props.appointment,
      physicalTests: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    getPatientPhysicalTests(this.state.appointment.patientId)
      .then(res => {
        this.setState({
          physicalTests: res.data.physicalExaminations,
          isLoading: false,
        });
      })
      .catch(error => {
        if (error.response) {
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
        data={this.state.physicalTests}
        isLoading={this.state.isLoading}
        columns={[
          {
            title: 'Kod badania',
            field: 'code'
          },
          {
            title: 'Wynik',
            field: 'result'
          },
          {
            title: 'Data umówienia',
            field: 'registrationDate'
          },
          {
            title: 'Data wykonania',
            field: 'finishedCancelledDate'
          },
        ]}
      />
    )
  }
}

export default HistoryPhysicalTestContainer;