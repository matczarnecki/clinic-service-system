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
          Wizyty
        </Typography>
        <Grid container>
          <Grid item xs={12} md={3}>
            <KeyboardDatePicker
              variant="inline"
              disableToolbar
              format="dd/MM/yyyy"
              value={props.date}
              label="Data"
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
            title="Wizyty"
            options={{
              emptyRowsWhenPaging: false
            }}
            isLoading={props.isLoading}
            actions={[
              {
                icon: 'add',
                tooltip: 'Dodaj wizytę',
                isFreeAction: true,
                onClick: props.onAdd,
              },
              rowData => ({
                icon: 'delete',
                tooltip: 'Anuluj wizytę',
                onClick: props.onCancel,
                disabled: rowData.status !== 'REJ'
              })
            ]}
          />
        </div>
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default RegistrantComponent;
