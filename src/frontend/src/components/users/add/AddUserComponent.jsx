import React from 'react';
import { Typography, Card, TextField, Grid, Divider, MenuItem, Button, InputLabel } from '@material-ui/core';
import { withFormik } from 'formik';
import * as Yup from "yup";
import { withSnackbar } from '../../../ui/SnackbarContext';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import LoadingOverlay from './../../../ui/LoadingOverlay';


const formikEnhancer = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    role: props.editMode && props.user && props.user.role ? props.user.role : "ADM",
    username: props.editMode && props.user && props.user.username ? props.user.username : '',
    password: null,
    retypePassword: null,
    firstName: props.editMode && props.user && props.user.firstName ? props.user.firstName : '',
    lastName: props.editMode && props.user && props.user.lastName ? props.user.lastName : '',
    email: props.editMode && props.user && props.user.email ? props.user.email : '',
    editMode: props.editMode
  }),

  handleSubmit: (values, { props }) => {
    let data = { ...values };
    let onSubmit = props.onEdit;
    if ((values.password || values.retypePassword) && (values.password !== values.retypePassword)) {
      props.showMessage("Password do not match");
      return;
    }

    delete data.retypePassword;
    delete data.editMode;
    if (!props.editMode) {
      onSubmit = props.onAdd;
    } else {
      delete data.role;
    }
    onSubmit(data)
      .then(res => {
        props.showMessage(res.data);
        props.goBack();
      })
      .catch(error => {
        props.showMessage(error.response.data.message);
      });
  },

  validationSchema: Yup.object().shape({
    editMode: Yup.bool(),
    username: Yup.string().required("Username can't be empty!"),
    password: Yup
    .string()
    .nullable()
    .when("editMode", {
      is: false,
      then: Yup.string().required("Password can't be empty!")
    }),
    retypePassword: Yup
    .string()
    .nullable()
    .when("editMode", {
      is: false,
      then: Yup.string().required("Retyped password can't be empty!")
    }),
    firstName: Yup.string().required("First name can't be empty!"),
    lastName: Yup.string().required("Last name can't be empty!"),
    email: Yup.string().email().required("Email can't be empty!"),
    role: Yup.string().required("Role can't be empty!"),
  }),
});

const AddUserComponent = (props) => {
  const {
    touched,
    errors,
  } = props;

  return (
    <Card className="card">
      <Typography variant="h5" className="underline-title">
        {props.editMode ? 'Edit user' : 'Add user'}
      </Typography>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={3}>
          <InputLabel>
            Username
          </InputLabel>
          <TextField
            id='username'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            fullWidth
            variant='outlined'
            value={props.values.username}
            helperText={touched.username ? errors.username : ""}
            error={touched.username && Boolean(errors.username)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputLabel>
            Password
          </InputLabel>
          <TextField
            id='password'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            fullWidth
            variant='outlined'
            value={props.values.password}
            type="password"
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputLabel>
            Retype password
          </InputLabel>
          <TextField
            id='retypePassword'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            fullWidth
            variant='outlined'
            value={props.values.retypePassword}
            type="password"
            helperText={touched.retypePassword ? errors.retypePassword : ""}
            error={touched.retypePassword && Boolean(errors.retypePassword)}
          />
        </Grid>
      </Grid>

      <Divider style={{ marginBottom: '2%', marginTop: "2%" }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <InputLabel>
            First name
          </InputLabel>
          <TextField
            id='firstName'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            fullWidth
            variant='outlined'
            value={props.values.firstName}
            helperText={touched.firstName ? errors.firstName : ""}
            error={touched.firstName && Boolean(errors.firstName)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <InputLabel>
            Last name
          </InputLabel>
          <TextField
            id='lastName'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            fullWidth
            variant='outlined'
            value={props.values.lastName}
            helperText={touched.lastName ? errors.lastName : ""}
            error={touched.lastName && Boolean(errors.lastName)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <InputLabel>
            Email
          </InputLabel>
          <TextField
            id='email'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            fullWidth
            variant='outlined'
            value={props.values.email}
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
          />
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: '2%', marginTop: "2%" }} />

      <Grid container spacing={2}>

        <Grid item xs={12} sm={3}>
          <InputLabel>
            Rola
          </InputLabel>
          <TextField
            id="role"
            value={props.values.role}
            onChange={props.handleChange('role')}
            onBlur={props.handleBlur('role')}
            variant="outlined"
            fullWidth
            disabled={props.editMode}
            select={!props.editMode}
          >
            {props.roles.map((element) => (
              <MenuItem key={element.code} value={element.code}>
                {element.code} - {element.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

      </Grid>

      <Divider style={{ marginBottom: '2%', marginTop: "2%" }} />

      <div style={{ textAlign: 'right' }} >
        <div>
          <Button
            color="primary"
            variant="outlined"
            style={{ marginRight: '1%' }}
            endIcon={<BackspaceIcon />}
            onClick={props.goBack}
          >
            Back
          </Button>
          <Button
            color="primary"
            variant="outlined"
            endIcon={<SaveIcon />}
            onClick={props.handleSubmit}
          >
            {props.editMode ? 'Save' : 'Add'}
          </Button>
        </div>
      </div>
      <LoadingOverlay
        open={props.isLoading}
      />
    </Card >

  );
}

export default withSnackbar(formikEnhancer(AddUserComponent));