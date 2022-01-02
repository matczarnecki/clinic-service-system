import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  Button,
  Zoom,
} from '@material-ui/core';


const YesNoDialog = (props) => {
  return (
    <Dialog
      open={props.visible}
      onClose={props.onHide}
      maxWidth='xs'
      TransitionComponent={Zoom}
    >
      <DialogTitle>
        {props.title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {props.content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onHide} color="primary">
          No
          </Button>
        <Button onClick={props.onConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default YesNoDialog;