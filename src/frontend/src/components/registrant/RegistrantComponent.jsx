import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Card, Typography, Grid } from "@material-ui/core";
import MaterialTable from 'material-table';

const RegistrantComponent = props => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card className="card">
        <Typography variant="h5" className="underline-title">
          Appointments
        </Typography>
        <Grid container>
          <Grid item xs={12} md={3}>
            <KeyboardDatePicker
              variant="inline"
              disableToolbar
              format="yyyy-MM-dd"
              value={props.date}
              label="Date"
              onChange={props.handleDateChange}
              fullWidth
              style={{marginBottom: "3%"}}
            />
          </Grid>
        </Grid>
        <div className="table">
          <MaterialTable
            columns={props.columns}
            data={props.data}
            title="Appointments"
            options={{
              emptyRowsWhenPaging: false
            }}
            isLoading={props.isLoading}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add appointment',
                isFreeAction: true,
                onClick: props.onAdd,
              },
              rowData => ({
                icon: 'delete',
                tooltip: 'Cancel appointment',
                onClick: props.onCancel,
                disabled: rowData.status !== 'SCHEDULED'
              })
            ]}
          />
        </div>
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default RegistrantComponent;
