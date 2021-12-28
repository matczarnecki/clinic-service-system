import React, { Component } from 'react';
import { getPatientLaboratoryTests } from '../../../../actions/laboratoryTest';
import HistoryComponent from './HistoryComponent';

class HistoryLaboratoryTestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: props.appointment,
      laboratoryTests: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    getPatientLaboratoryTests(this.state.appointment.patientId)
      .then(res => {
        this.setState({
          laboratoryTests: res.data.laboratoryTests,
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
        data={this.state.laboratoryTests}
        isLoading={this.state.isLoading}
        columns={[
          {
            title: 'Kod badania',
            field: 'examinationCode'
          },
          {
            title: 'Status',
            field: 'statusCode'
          },
          {
            title: 'Wynik',
            field: 'result'
          },
          {
            title: 'Opis',
            field: 'doctorNote'
          },
          {
            title: 'Uwagi kierownika',
            field: 'supervisorNote',
          },
          {
            title: 'Data umówienia',
            field: 'orderedDate'
          },
          {
            title: 'Data wykonania',
            field: 'executionCancelledDate'
          },
        ]}
      />
    )
  }
}

export default HistoryLaboratoryTestContainer;