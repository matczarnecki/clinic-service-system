import React from 'react';
import { Card, TextField, Grid, Typography, Button } from '@material-ui/core'
import { withFormik } from 'formik';
import * as Yup from "yup";
import { withSnackbar } from './../../ui/SnackbarContext';
import LoadingOverlay from './../../ui/LoadingOverlay';

const formikEnhancer = withFormik({
  enableReinitialize: true,

  mapPropsToValues: props => ({
    username: '',
    password: '',
  }),

  handleSubmit: (values, { props }) => {
    props.log(values)
      .then(() => {
        props.redirectToMainPage();
      })
      .catch(error => {
        props.disableOverlay();
        if (error.response?.data?.message) {
          props.showMessage(error.response.data.message);
        } else {
          props.showMessage("Unrecognized error");
        }
      });
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Login nie może być pusty!"),
    password: Yup.string().required("Hasło nie może być puste!").nullable()
  })
});

const LoginComponent = (props) => {

  const {
    touched,
    errors,
  } = props;

  return (
  <>
    <Card className='login-card box-center'>
      <Typography variant="h5" className="underline-title-login">
        clinic system
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className='input'
              id='username'
              onChange={props.handleChange}
              fullWidth
              variant='outlined'
              label='Username'
              style={{ marginTop: '1%' }}
              value={props.values.username}
              helperText={touched.username ? errors.username : ""}
              error={touched.username && Boolean(errors.username)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className='input'
              id='password'
              onChange={props.handleChange}
              fullWidth
              variant='outlined'
              label='Password'
              type="password"
              value={props.values.password}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
            />
          </Grid>
          <Grid item xs={0} md={6} />
          <Grid item xs={12} md={6}>
            <Button color="primary" fullWidth onClick={props.handleSubmit} type="submit">
              Sign in
        </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
    <LoadingOverlay
      open={props.isLoading}
    />
  </>
  )
};

export default withSnackbar(formikEnhancer(LoginComponent));