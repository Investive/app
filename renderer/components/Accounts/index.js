import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Router from 'next/router';
import idToLabel from "../../utils/labels";
import formatDate from "../../utils/dates";

import electron from 'electron';

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    card: {
        height: '100%',
        width: '25vw',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    }
}));

const AccountList = ({accounts}) => {
    let pictures = ["images/succulent.png", "images/elephantear.png", "images/fiddletree.png"]

    function setAccountID(accountId) {
        if (ipcRenderer) {
            ipcRenderer.send('add-message', 'accountId', accountId);
        }
        Router.push("/positions");
    }
    for (const account of accounts) {
        account.picture = pictures.shift();
    }

    const classes = useStyles();
    return (
        <Grid container justify="center" spacing={4}>
            {accounts.map(account =>
                <Grid item key={account.id}>
                    <Card className={classes.card} bgcolor="white">
                        <CardMedia
                            className={classes.cardMedia}
                            image={account.picture}
                            title={account.account_type}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {idToLabel(account.account_type)}
                            </Typography>
                            <Typography>
                                Opened on {formatDate(account.opened_at)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        {idToLabel(account.account_type) === "Crypto"
                            ? <Button variant="outlined" size="medium" color="primary" disabled={true}>Not Supported Yet</Button>
                            : <Button variant="outlined" size="medium" color="primary" onClick={() => {setAccountID(account.id)}}>OPEN</Button>
                        }
                        </CardActions>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}

export default AccountList;
