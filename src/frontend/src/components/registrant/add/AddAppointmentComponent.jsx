import React from 'react';
import { withFormik } from 'formik';
import { Card, Grid, TextField, Typography, Button, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import "date-fns";
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
import formatISO from 'date-fns/formatISO';


const formikEnhancer = withFormik({
  enableReinitialize: false,

  mapPropsToValues: () => ({
    patient: '',
    doctor: '',
    registrationDate: new Date(),
  }),

  handleSubmit: (values, { props }) => {
    const data = {
      doctorId: values.doctor.id,
      patientId: values.patient.id,
      appointmentTime: formatISO(values.registrationDate).substring(0,16)
    }
    props.onSubmit(data)
      .then(res => {
        props.showMessage(res.data);
        props.goBack();
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          props.showMessage(error.response.data.message);
        } else {
          props.showMessage("Unrecognized error");
        }
      });
  },
  validationSchema: Yup.object().shape({
    patient: Yup.object().required("Patient can't be empty!").nullable(),
    doctor: Yup.object().required("Doctor can't be empty!").nullable(),
    registrationDate: Yup.date().required("Appointment time can't be empty!").nullable(),
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
        Add appointment
      </Typography>
      <Grid container spacing={4}>
        <Grid container spacing={2} item xs={12} sm={6}>

          <Grid item xs={9}>
            <Autocomplete
              id="patient"
              options={props.patients}
              getOptionLabel={option => makeLabel(option, 'firstName', 'lastName')}
              fullWidth
              value={props.values.patient}
              onChange={(_, value) => props.setFieldValue('patient', value)}
              renderInput={params =>
                <TextField
                  {...params}
                  label="Patient"
                  variant="outlined"
                  helperText={props.touched.patient ? props.errors.patient : ""}
                  error={props.touched.patient && Boolean(props.errors.patient)}
                />
              }
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
              getOptionLabel={option => makeLabel(option, 'firstName', 'lastName')}
              id="doctor"
              value={props.values.doctor}
              onChange={(_, value) => {
                props.handleDoctorChange(props.values.registrationDate, value);
                props.setFieldValue('doctor', value);
              }}
              renderInput={params =>
                <TextField
                  {...params}
                  label="Doctor"
                  variant="outlined"
                  helperText={props.touched.doctor ? props.errors.doctor : ""}
                  error={props.touched.doctor && Boolean(props.errors.doctor)}
                />
              }
            />
          </Grid>

          <Grid item xs={9}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                ampm={false}
                id="registrationDate"
                variant="inline"
                size="large"
                inputVariant="outlined"
                InputProps={{ readOnly: true }}
                disablePast
                format="yyyy-MM-dd HH:mm"
                value={props.values.registrationDate}
                helperText={props.touched.registrationDate ? props.errors.registrationDate : ""}
                error={props.touched.registrationDate && Boolean(props.errors.registrationDate)}
                label="Appointment time"
              
                onChange={(value) => {
                  props.handleDateChange(value, props.values.doctor?.id)
                  props.setFieldValue('registrationDate', value)
                }
                }
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="table">
            <MaterialTable
              title="Appointments"
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
            Back
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
            Save
          </Button>
        </Grid>
      </Grid>
    </Card >
  );
}

export default withSnackbar(formikEnhancer(AddAppointmentComponent));