import React from 'react';
import { TextField, Grid, Divider, Button, InputLabel } from '@material-ui/core';
import { withFormik } from 'formik';
import { withSnackbar } from '../../../../ui/SnackbarContext';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Autocomplete } from '@material-ui/lab';


const formikEnhancer = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => (props.formikValues),

  handleSubmit: (values, { props }) => {
    values.ExaminationCode = values.ExaminationCode.code;
    props.onSubmit(values)
      .then(res => {
        props.showMessage(res.data);
      })
      .catch(error => {
        if (error.response) {
          props.showMessage(error.response.data);
        } else {
          props.showMessage("Nieznany błąd");
        }
      });
  },
});

const TestComponent = (props) => {
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
        <Grid item xs={12}>
          <Grid item xs={12} sm={3}>
            <InputLabel>
              Kod badania
          </InputLabel>
            <Autocomplete
              id="ExaminationCode"
              options={props.codes}
              getOptionLabel={option => option && option.code && option.name ? `${option.code} - ${option.name}` : ''}
              fullWidth
              value={props.values.ExaminationCode}
              onChange={(_, value) => props.setFieldValue('ExaminationCode', value)}
              renderInput={params => <TextField {...params} variant="outlined" />}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>
            {props.textFieldLabel}
          </InputLabel>
          <TextField
            id={props.textFieldId}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            fullWidth
            variant='outlined'
            multiline
            rows="4"
            value={props.values[props.textFieldId]}
          />
        </Grid>
      </Grid>

      <div style={{ textAlign: 'right', marginTop: '2%' }} >
        <div>
          <Button
            color="primary"
            variant="outlined"
            endIcon={<AddBoxIcon />}
            onClick={props.handleSubmit}
          >
            Dodaj badanie
          </Button>
        </div>
      </div>
    </>
  );
}

export default withSnackbar(formikEnhancer(TestComponent));