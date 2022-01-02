import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "./../../../ui/SnackbarContext";
import { withFormik } from "formik";
import * as Yup from "yup";
import Zoom from "@material-ui/core/Zoom";

const formikEnhancer = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    firstName: "",
    lastName: "",
  }),

  handleSubmit: (values, { props, resetForm }) => {
    props
      .onSubmit(values)
      .then((res) => {
        props.showMessage(res?.data);
        props.fetch();
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          props.showMessage(error.response.data.message);
        } else {
          props.showMessage("Unrecognized error!");
        }
      })
      .then(resetForm)
      .then(props.onClose);
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("First name can't be empty!"),
    lastName: Yup.string().required("Last name can't be empty!"),
  }),
});

const AddPatientDialogComponent = (props) => {

  const {
    touched,
    errors,
  } = props;

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth="xs"
      TransitionComponent={Zoom}
    >
      <DialogTitle>Add patient</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="firstName"
              onChange={props.handleChange}
              fullWidth
              variant="outlined"
              label="First name"
              value={props.values.firstName}
              helperText={touched.firstName ? errors.firstName : ""}
              error={touched.firstName && Boolean(errors.firstName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="lastName"
              onChange={props.handleChange}
              fullWidth
              variant="outlined"
              label="Last name"
              value={props.values.lastName}
              helperText={touched.lastName ? errors.lastName : ""}
              error={touched.lastName && Boolean(errors.lastName)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withSnackbar(formikEnhancer(AddPatientDialogComponent));
