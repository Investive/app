import React, {useEffect, useState} from 'react';
import electron from 'electron';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Copyright from "./shared/footer";
import {useForm} from "react-hook-form";
import Router from 'next/router';
import OTPComponent from "../components/OTP";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url("/images/login.png")',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fdf2f2',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        maxHeight: '150px',
        marginBottom: '2rem'
    }
}));

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const Login = () => {
    let email = "";
    const {register, errors, handleSubmit} = useForm();
    const [contact, setContact] = useState({
        email: '',
        password: ''
    });
    const [errorVal, setError] = useState(false);
    const [warnings, setWarnings] = useState([]);
    const [open, setOpen] = React.useState(false);

    // OTP Modal
    const handleClickOpen = () => {
        setOpen(true);
    };


    if (ipcRenderer) {
        ipcRenderer.sendSync('logout');
        email = ipcRenderer.sendSync('get-messages', 'email');
        ipcRenderer.on('version-reply', (event, result) => {
            if (result === "outdated") {
                setWarnings(warnings => ([...warnings, ...[<Alert severity="warning" key="upgrade"> Upgrade
                    available, download on investive.co</Alert>]]));
            } else if (result === "unknown") {
                setWarnings(warnings => ([...warnings, ...[<Alert severity="info" key="upgrade"> Could not check for
                    updates</Alert>]]));
            }
        })
        ipcRenderer.send('version')
    } else {
        email = '';
    }
    const [rememberMe, setRememberMe] = useState(email);
    const [rememberMeSwitch, setRememberMeSwitch] = useState(email.length > 0 ? true : false);

    useEffect(() => {
        setContact({email: email, password: ''})
    }, []);

    const handleChange = e => {
        setContact({...contact, [e.target.name]: e.target.value});
    }

    const handleRememberMeChange = e => {
        setRememberMeSwitch(!rememberMeSwitch);
    }

    const setEmail = (valid) => {
        if (valid) {
            ipcRenderer.send('add-message', 'email', contact.email);
        } else {
            ipcRenderer.send('add-message', 'email', '');
        }
    }

    const validateEmail = (value) => {
        // RegEx to validate email strings;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(contact.email).toLowerCase())) {
            setError(false);
            return true;
        } else {
            setError(true);
            return false;
        }
    }

    const onSubmit = e => {
        // e.preventDefault();
        ipcRenderer.on('login-reply', (event, arg) => {
            if (rememberMeSwitch) {
                ipcRenderer.send('add-message', 'email', contact.email);
            } else {
                ipcRenderer.send('add-message', 'email', '');
            }
            const result = JSON.parse(arg)
            setError(result.valid);
            if (result.status === 200) {
                ipcRenderer.send('add-message', 'account', [result.data.name, contact.email]);
                Router.push('/choose-account');
            } else if (result.status === 400) {
                handleClickOpen()
            }
        })
        ipcRenderer.send('login', contact)

    }

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <OTPComponent open={open} setOpen={setOpen} contact={contact}/>
            <Grid item xs={false} sm={false} md={6} className={classes.image}/>
            <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src='images/investive-logo.svg' alt='investive-logo' className={classes.logo}/>
                    <Typography component="h1" variant="h5">
                        Please provide your login information to get started
                    </Typography>
                    {warnings}
                    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                            error={errorVal}
                            FormHelperTextProps={{error: true}}
                            defaultValue={rememberMe}
                            inputRef={register({validate: validateEmail})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={errorVal}
                            FormHelperTextProps={{error: true}}
                            helperText={errorVal ? "Invalid password or email" : ""}
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            checked={rememberMeSwitch}
                            onChange={handleRememberMeChange}
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember my email"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Typography variant="body2">
                                    Don't have an account? Sign up at investive.co
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
export default Login;
