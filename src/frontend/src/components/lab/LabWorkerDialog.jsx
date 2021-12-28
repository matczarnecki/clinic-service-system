import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { withSnackbar } from './../../ui/SnackbarContext';
import { withFormik } from 'formik';
import * as Yup from "yup";
import Zoom from '@material-ui/core/Zoom';

const formikEnhancer = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    Note: '',
  }),

  handleSubmit: (values, { props, resetForm }) => {
    const onSubmit = props.cancelMode ? props.cancelSubmit : props.makeSubmit;
    onSubmit(values)
      .then(res => {
        props.onClose();
        props.showMessage(res.data);
        props.fetchData();
      })
      .catch(error => {
        props.onClose();
        if (error.response) {
          props.showMessage(error.response.data);
        } else {
          props.showMessage("Nieznany błąd");
        }
      })
      .then(resetForm)
  },

  validationSchema: Yup.object().shape({
    Note: Yup.string().required("Opis nie może być pusty!"),
  }),
});

const LabWorkerDialog = (props) => {

  const {
    touched,
    errors,
  } = props;

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      TransitionComponent={Zoom}
      PaperProps={{
        style: {
          backgroundColor: '#424242'
        }
      }}
    >
      <DialogTitle>
        {props.cancelMode ? 'Anuluj badanie' : 'Przeprowadź badanie'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='Note'
              onChange={props.handleChange}
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              label='Opis'
              value={props.values.Note}
              helperText={touched.Note ? errors.Note : ""}
              error={touched.Note && Boolean(errors.Note)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Wróć
          </Button>
        <Button onClick={props.handleSubmit} color="primary">
          {props.cancelMode ? 'Anuluj' : 'Zapisz'}
          </Button>
      </DialogActions>

    </Dialog>
  )
}

export default withSnackbar(formikEnhancer(LabWorkerDialog));