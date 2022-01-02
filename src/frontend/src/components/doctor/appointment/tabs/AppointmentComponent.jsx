import React from 'react';
import { TextField, Grid, Divider, Button, InputLabel } from '@material-ui/core';
import { withFormik } from 'formik';
import * as Yup from "yup";
import { withSnackbar } from '../../../../ui/SnackbarContext';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';


const formikEnhancer = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    Description: '',
    Diagnose: '',
  }),

  handleSubmit: (values, { props }) => {
    props.onSubmit(values)
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
    Description: Yup.string().required("Opis nie może być pusty")
  }),
});

const AppointmentComponent = (props) => {

  const {
    touched,
    errors,
  } = props;
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <InputLabel>
            Pacjent
          </InputLabel>
          <TextField
            id='Patient'
            fullWidth
            variant='outlined'
            value={props.appointment ? props.appointment.patientName : ''}
            disabled
          />
        </Grid>
      </Grid>

      <Divider style={{ marginBottom: '2%', marginTop: "2%" }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel>
            Diagnoza
          </InputLabel>
          <TextField
            id='Diagnose'
            onChange={props.handleChange}
            fullWidth
            variant='outlined'
            value={props.values.Diagnose}
            multiline
            rows="4"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>
            Opis
          </InputLabel>
          <TextField
            id='Description'
            onChange={props.handleChange}
            fullWidth
            variant='outlined'
            value={props.values.Description}
            multiline
            rows="4"
            helperText={touched.Description ? errors.Description : ""}
            error={touched.Description && Boolean(errors.Description)}
          />
        </Grid>
      </Grid>
      <div style={{ textAlign: 'right', marginTop: '2%' }} >
        <div>
          <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: '1%' }}
            endIcon={<BackspaceIcon />}
            onClick={props.goBack}
          >
            Wróć
          </Button>
          <Button
            color="primary"
            variant="outlined"
            endIcon={<SaveIcon />}
            onClick={props.handleSubmit}
          >
            Zakończ wizytę
          </Button>
        </div>
      </div>
    </>
  );
}

export default withSnackbar(formikEnhancer(AppointmentComponent));