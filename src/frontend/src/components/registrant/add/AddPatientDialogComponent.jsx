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
    FirstName: "",
    Surname: "",
    PersonalIdentityNumber: "",
  }),

  handleSubmit: (values, { props, resetForm }) => {
    props
      .onSubmit(values)
      .then((res) => {
        props.showMessage(res.data);
        props.fetch();
      })
      .catch((error) => {
        if (error.response) {
          props.showMessage(error.response.data);
        } else {
          props.showMessage("Nieznany błąd");
        }
      })
      .then(resetForm)
      .then(props.onClose);
  },

  validationSchema: Yup.object().shape({
    FirstName: Yup.string().required("Imię nie może być pusty!"),
    Surname: Yup.string().required("Nazwisko nie może być puste!"),
    PersonalIdentityNumber: Yup.string()
      .length(11, "Pesel musi zawierać 11 znaków!")
      .matches('[0-9]{4}[0-3]{1}[0-9}{1}[0-9]{5}',"Niepoprawny pesel!")
      .required("Pesel nie może być pusty!"),
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
      <DialogTitle>Dodawanie pacjenta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="FirstName"
              onChange={props.handleChange}
              fullWidth
              variant="outlined"
              label="Imię"
              value={props.values.FirstName}
              helperText={touched.FirstName ? errors.FirstName : ""}
              error={touched.FirstName && Boolean(errors.FirstName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Surname"
              onChange={props.handleChange}
              fullWidth
              variant="outlined"
              label="Nazwisko"
              value={props.values.Surname}
              helperText={touched.Surname ? errors.Surname : ""}
              error={touched.Surname && Boolean(errors.Surname)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="PersonalIdentityNumber"
              onChange={props.handleChange}
              fullWidth
              variant="outlined"
              label="PESEL"
              value={props.values.PersonalIdentityNumber}
              helperText={touched.PersonalIdentityNumber ? errors.PersonalIdentityNumber : ""}
              error={touched.PersonalIdentityNumber && Boolean(errors.PersonalIdentityNumber)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Anuluj
        </Button>
        <Button onClick={props.handleSubmit} color="primary">
          Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withSnackbar(formikEnhancer(AddPatientDialogComponent));
