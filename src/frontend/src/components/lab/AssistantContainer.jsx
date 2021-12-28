import React, { Component } from 'react';
import { getLaboratoryTests, assistantMakeTest, assistantCancelTest } from '../../actions/laboratoryTest';
import { getLaboratoryTestStatuses } from '../../actions/laboratoryTestStatus';
import LabWorkerComponent from './LabWorkerComponent';
import { withSnackbar } from '../../ui/SnackbarContext';

class AssistantContainer extends Component {
  constructor() {
    super();
    this.state = {
      laboratoryTests: [],
      status: 'ZLE',
      statuses: [],
      date: new Date(),
      cancelMode: false,
      testId: '',
      dialogVisible: false,
    };
  }

  componentDidMount() {
    this.fetchLaboratoryTests();
    this.fetchStatuses();
  }

  handleSelectChange = event => {
    this.setState({
      status: event.target.value,
    }, () => {
      this.fetchLaboratoryTests();
    });
  }

  fetchLaboratoryTests = () => {
    this.setState({
      isLoading: true,
    }, () => {
      getLaboratoryTests(this.state.status)
        .then((res) => {
          this.setState({
            isLoading: false,
            laboratoryTests: res.data.laboratoryTests,
          })
        })
    })
  }

  fetchStatuses = () => {
    getLaboratoryTestStatuses()
      .then(res => {
        this.setState({
          statuses: res.data.statuses,
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

  executeTest = (cancelMode, rowData) => {
    this.setState({
      cancelMode: cancelMode,
      testId: rowData.id,

    }, () => {
      this.setState({
        dialogVisible: true,
      })
    })
  }

  hideDialog = () => {
    this.setState({
      dialogVisible: false,
      testId: '',
    });
  }

  cancelTest = data => assistantCancelTest(this.state.testId, data);

  makeTest = data => assistantMakeTest(this.state.testId, data);

  render() {
    return (
      <LabWorkerComponent
        isLoading={this.state.isLoading}
        handleDateChange={this.handleDateChange}
        handleSelectChange={this.handleSelectChange}
        status={this.state.status}
        statuses={this.state.statuses}
        date={this.state.date}
        executeTest={this.executeTest}
        hideDialog={this.hideDialog}
        cancelMode={this.state.cancelMode}
        dialogVisible={this.state.dialogVisible}
        cancelTest={this.cancelTest}

        makeTest={this.makeTest}
        fetchData={this.fetchLaboratoryTests}
        //tabela
        title="Badania"
        data={this.state.laboratoryTests}
        columns={[
          {
            title: "Status",
            field: 'statusCode'
          },
          {
            title: "Opis lekarza",
            field: 'doctorNote'
          },
          {
            title: "Opis kierownika laboratorium",
            field: 'supervisorNote'
          },
          {
            title: "Data zlecenia",
            field: 'orderedDate'
          },
          {
            title: "Kod badania",
            field: 'examinationCode'
          },
          {
            title: "Data wykonania/anulowania laboranta",
            field: 'executionCancelledDate'
          },
          {
            title: "Data akceptacji/anulowania kierownika",
            field: 'acceptionCancelledDate'
          },
          {
            title: "Wynik",
            field: 'result'
          },
        ]}
        actions={[
          rowData => ({
            icon: 'edit',
            tooltip: 'Przeprowadź badanie',
            onClick: (_, rowData) => this.executeTest(false, rowData),
            disabled: rowData.statusCode !== 'ZLE',
          }),
          rowData => ({
            icon: 'delete',
            tooltip: 'Anuluj badanie',
            onClick: (_, rowData) => this.executeTest(true, rowData),
            disabled: rowData.statusCode !== 'ZLE',
          }),
        ]}
      />
    )
  }
}

export default withSnackbar(AssistantContainer);