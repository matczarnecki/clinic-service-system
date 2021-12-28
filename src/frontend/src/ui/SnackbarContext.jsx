import React from 'react';
import { Snackbar } from '@material-ui/core';

const def_state = {
  open: false,
  message: '',
}

const SnackbarContext = React.createContext(def_state);

class SnackbarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, def_state);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(message) {
    this.setState({
      open: true,
      message,
    });
  }

  handleClose() {
    this.setState({
      open: false,
      message: '',
    })
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={this.state.message}
        />
        <SnackbarContext.Provider value={{
          ...this.state,
          handleOpen: this.handleOpen,
        }}
        >
          {children}
        </SnackbarContext.Provider>
      </>
    );
  }
}

const SnackbarConsumer = SnackbarContext.Consumer;

const withSnackbar = (Component) => (props) => (
  <SnackbarConsumer>
    {
      ({
        message,
        handleOpen,
        open
      }) => (
          <Component
            {...props}
            showMessage={handleOpen}
          />
        )
    }
  </SnackbarConsumer>
);

export {
  SnackbarContext, SnackbarProvider, SnackbarConsumer, withSnackbar,
};
