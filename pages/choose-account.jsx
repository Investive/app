import React, {useEffect, useState} from "react";
import Head from 'next/head';
import AccountList from '../components/Accounts';
import Typography from "@material-ui/core/Typography";

import {Link} from "../components/Link";
import Router from 'next/router';
import electron from 'electron';
import Copyright from "./shared/footer";
import Box from "@material-ui/core/Box";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from "@material-ui/core/Button";

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const ChooseAccount = () => {
    const [accounts, setAccounts] = useState([]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        headerMargin: {
            marginTop: '10vh'
        }
    }));
    const classes = useStyles();

    let positiveAccounts = 0; /* number of accounts with greater or less than 0 balance */
    let nonZeroAccount = null; /* last nonZeroAccount found */

    useEffect(() => {
        const onAccount = (event, arg) => {
            let result = JSON.parse(arg)
            if (result.data && result.data[0].object === "account") {
                setAccounts(result.data);
                // If the user only has one account, automatically redirect them
                if (result.length === 1 || positiveAccounts === 1) {
                    ipcRenderer.send('add-message', 'accountId', nonZeroAccount.id);
                    Router.push('/positions');
                }
            } else {
                console.log("error with getting accounts")
                console.log(result)
            }
        }

        if (ipcRenderer) {
            ipcRenderer.on('choose-account-reply', onAccount)
            ipcRenderer.send('choose-account')
        }
        accounts.forEach(account => {
            if (account.current_balance.amount !== 0) {
                nonZeroAccount = account;
                positiveAccounts++;
            }
        });
        return function cleanup() {
            ipcRenderer.removeListener('choose-account-reply', onAccount)
        };

    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Head>
                    <title>Investive</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Typography variant="h2" align={"center"} className={classes.headerMargin} gutterBottom>
                    Select an account
                </Typography>
                <AccountList accounts={accounts}/>
                <Box mt={5}>
                    <Copyright/>
                </Box>
                <Typography gutterBottom align={"center"}>
                    <Button variant="contained" href="/home">Back</Button>
                </Typography>
            </Container>
        </React.Fragment>
    )
}

export default ChooseAccount;
