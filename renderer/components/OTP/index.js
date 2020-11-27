import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Router from "next/router";
import electron from "electron";

export default function OTPComponent({open, setOpen, contact}) {
    const [otp, setOTP] = useState('')
    // prevent SSR webpacking
    const ipcRenderer = electron.ipcRenderer || false;

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = e => {
        // e.preventDefault();
        ipcRenderer.on('login-reply', (event, arg) => {
            const result = JSON.parse(arg)
            if (result.status === 200) {
                ipcRenderer.send('add-message', 'account', [result.data.name, contact.email]);
                Router.push('/choose-account');
            }
        })
        contact.otp = otp;
        ipcRenderer.send('login', contact)

    }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Extra Authentication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the one time password or code for your account, either through email or authentication app.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code"
            onChange={event => setOTP(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}