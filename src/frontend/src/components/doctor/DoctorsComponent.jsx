import React from 'react';
import MaterialTable from 'material-table';
import { Card, Typography, Grid, InputLabel, Divider } from '@material-ui/core';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const DoctorsComponent = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card className="card">
        <Typography variant="h5" className="underline-title">
          Appointments
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>
              Date
          </InputLabel>
            <KeyboardDatePicker
              variant="outlined"
              disableToolbar
              format="dd/MM/yyyy"
              value={props.date}
              onChange={props.handleDateChange}
              fullWidth
              style={{ marginBottom: "3%" }}
            />
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: '2%', marginTop: '2%' }} />
        <div className="table">
          <MaterialTable
          title={props.title}
          columns={props.columns}
          data={props.data}
          options={{
            emptyRowsWhenPaging: false,
          }}
          isLoading={props.isLoading}
          actions={props.actions}
        />
        </div>
      </Card>
    </MuiPickersUtilsProvider >
  );
}

export default DoctorsComponent;