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
    description: '',
    diagnosis: '',
  }),

  handleSubmit: (values, { props }) => {
    props.onSubmit(values)
      .then(res => {
        props.showMessage(res.data);
        props.goBack();
      })
      .catch(error => {
        if (error.response.data.message) {
          props.showMessage(error.response.data.message);
        } else {
          props.showMessage("Unrecognized error");
        }
      });
  },

  validationSchema: Yup.object().shape({
    description: Yup.string()
      .max(255, "Description can't be longer than 255")
      .required("Description can't be empty!"),
    diagnosis: Yup.string()
      .max(255, "Diagnosis can't be longer than 255")
      .required("Diagnosis can't be empty!")
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
            Patient
          </InputLabel>
          <TextField
            id='patient'
            fullWidth
            variant='outlined'
            value={props.appointment ?
              `${props.appointment?.patient?.firstName}  ${props.appointment?.patient?.lastName}` : ''}
            disabled
          />
        </Grid>
      </Grid>

      <Divider style={{ marginBottom: '2%', marginTop: "2%" }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel>
            Diagnosis
          </InputLabel>
          <TextField
            id='diagnosis'
            onChange={props.handleChange}
            fullWidth
            variant='outlined'
            value={props.values.diagnosis}
            multiline
            rows="4"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>
            Description
          </InputLabel>
          <TextField
            id='description'
            onChange={props.handleChange}
            fullWidth
            variant='outlined'
            value={props.values.description}
            multiline
            rows="4"
            helperText={touched.description ? errors.description : ""}
            error={touched.description && Boolean(errors.description)}
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
            Cancel
          </Button>
          <Button
            color="primary"
            variant="outlined"
            endIcon={<SaveIcon />}
            onClick={props.handleSubmit}
          >
            End appointment
          </Button>
        </div>
      </div>
    </>
  );
}

export default withSnackbar(formikEnhancer(AppointmentComponent));