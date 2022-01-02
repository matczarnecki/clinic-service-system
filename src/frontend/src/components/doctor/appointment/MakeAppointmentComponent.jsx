import React from 'react';
import { Card, Tabs, Tab } from '@material-ui/core';
import AppointmentComponent from './tabs/AppointmentComponent';
import TestComponent from './tabs/TestComponent';
import LoadingOverlay from './../../../ui/LoadingOverlay';
import HistoryAppointmentContainer from './tabs/HistoryAppointmentContainer';
import HistoryLaboratoryTestContainer from './tabs/HistoryLaboratoryTestContainer';
import HistoryPhysicalTestContainer from './tabs/HistoryPhysicalTestContainer';

const MakeAppointmentComponent = (props) => {
  return (
    <Card className="card">
      {props.appointment && props.appointment.status === 'ZAK' ? (<div>Ta wizyta została już zakończona</div>) : (
        <>
          <div className="tablist">
            <Tabs
              value={props.tab}
              onChange={props.changeTab}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Wizyta" />
              <Tab label="Badanie laboratoryjne" />
              <Tab label="Badanie fizykalne" />
              <Tab label="Wizyty" />
              <Tab label="Badania laboratoryjne" />
              <Tab label="Badania fizykalne" />
            </Tabs>
          </div>
          {props.tab === 0 &&
            <AppointmentComponent
              appointment={props.appointment}
              onSubmit={props.makeAppointment}
              goBack={props.goBack}
            />
          }
          {props.tab === 1 &&
            <TestComponent
              appointment={props.appointment}
              textFieldLabel='Opis'
              textFieldId='DoctorNote'
              codes={props.laboratoryCodes}
              onSubmit={props.addLaboratoryTest}
              formikValues={{
                DoctorNote: '',
                ExaminationCode: '',
              }}
            />
          }

          {props.tab === 2 &&
            <TestComponent
              appointment={props.appointment}
              textFieldLabel='Diagnoza'
              textFieldId='Result'
              codes={props.physicalCodes}
              onSubmit={props.addPhysicalTest}
              formikValues={{
                Result: '',
                ExaminationCode: '',
              }}
            />
          }

          {props.tab === 3 &&
            <HistoryAppointmentContainer
              appointment={props.appointment}
            />
          }
          {props.tab === 4 &&
            <HistoryLaboratoryTestContainer
              appointment={props.appointment}
            />
          }
          {props.tab === 5 &&
            <HistoryPhysicalTestContainer
              appointment={props.appointment}
            />
          }
        </>
      )}
      <LoadingOverlay
        open={props.isLoading}
      />
    </Card >

  );
}

export default MakeAppointmentComponent;