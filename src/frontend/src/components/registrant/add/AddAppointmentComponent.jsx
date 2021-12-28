import React from 'react';
import { withFormik } from 'formik';
import { Card, Grid, TextField, Typography, Button, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import "date-fns";
import { format } from 'date-fns'
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from "@material-ui/pickers";
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { withSnackbar } from './../../../ui/SnackbarContext';
import MaterialTable from 'material-table';
import * as Yup from "yup";


const formikEnhancer = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    Description: '',
    PatientId: '',
  }),

  handleSubmit: (values, { props }) => {
    const data = {
      ...values,
      PatientId: values.PatientId.id,
      DoctorId: props.DoctorId.id,
      RegistrationDate: format(props.RegistrationDate, 'yyyy/MM/dd HH:mm'),
    }
    props.onSubmit(data)
      .then(res => {
        props.showMessage(res.data);
        props.goBack();
      })
      .catch(error => {
        if (error.response) {
          props.showMessage(error.response.data);
        } else {
          props.showMessage("Nieznany błąd");
        }
      });
  },
  validationSchema: Yup.object().shape({
    PatientId: Yup.object().required("Login nie może być pusty!"),
  }),
});

function makeLabel(option, nameLabel, surnameLabel) {
  if (option) {
    if (option[nameLabel] && option[surnameLabel]) {
      return `${option[nameLabel]} ${option[surnameLabel]}`
    } else {
      return '';
    }
  }
}

const AddAppointmentComponent = (props) => {
  return (
    <Card className="card">
      <Typography variant="h5" className="underline-title">
        Dodaj wizytę
      </Typography>
      <Grid container spacing={4}>
        <Grid container spacing={2} item xs={12} sm={4}>

          <Grid item xs={9}>
            <Autocomplete
              id="PatientId"
              options={props.patients}
              getOptionLabel={option => makeLabel(option, 'firstName', 'surname')}
              fullWidth
              value={props.values.PatientId}
              onChange={(_, value) => props.setFieldValue('PatientId', value)}
              renderInput={params => <TextField {...params} label="Pacjent" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IconButton
              color="primary"
              onClick={props.openDialog}

            >
              <AddIcon />
            </IconButton>
          </Grid>

          <Grid item xs={9}>
            <Autocomplete
              options={props.doctors}
              getOptionLabel={option => makeLabel(option, 'name', 'surname')}
              id="DoctorId"
              value={props.DoctorId}
              onChange={(_, value) => props.handleDoctorChange(value)}
              renderInput={params => <TextField {...params} label="Doktor" variant="outlined" />}
            />
          </Grid>

          <Grid item xs={9}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                ampm={false}
                id="RegistrationDate"
                variant="inline"
                size="large"
                inputVariant="outlined"
                disablePast
                format="yyyy/MM/dd HH:mm"
                value={props.RegistrationDate}
                label="Data wizyty"
                onChange={newDate => props.handleDateChange(newDate)}
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8}>
          <div className="table">
            <MaterialTable
              title="Wizyty"
              columns={props.columns}
              data={props.data}
              options={{
                emptyRowsWhenPaging: false,
              }}
              isLoading={props.tableLoading}
            />
          </div>
        </Grid>
        <Grid item xs={false} sm={8} />
        <Grid item xs={12} sm={2}>
          <Button
            color="primary"
            size="large"
            variant="outlined"
            fullWidth
            endIcon={<BackspaceIcon />}
            onClick={props.goBack}
          >
            Wróć
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            color="primary"
            size="large"
            variant="outlined"
            fullWidth
            endIcon={<AddBoxIcon />}
            onClick={props.handleSubmit}
          >
            Dodaj
          </Button>
        </Grid>
      </Grid>
    </Card >
  );
}

export default withSnackbar(formikEnhancer(AddAppointmentComponent));