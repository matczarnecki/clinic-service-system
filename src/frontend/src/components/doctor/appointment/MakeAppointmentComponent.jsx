import React from 'react';
import { Card, Tabs, Tab } from '@material-ui/core';
import AppointmentComponent from './tabs/AppointmentComponent';
import LoadingOverlay from './../../../ui/LoadingOverlay';
import HistoryAppointmentContainer from './tabs/HistoryAppointmentContainer';

const MakeAppointmentComponent = (props) => {
  return (
    <Card className="card">
      {props.appointment && props.appointment.status === 'DONE' ? (<div>This appointment has been finished</div>) : (
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
              <Tab label="Appointment" />
              <Tab label="Previous appointments" />
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
            <HistoryAppointmentContainer
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