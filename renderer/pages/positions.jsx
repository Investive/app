import electron from 'electron';
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Router from "next/router";
import colorIndicator from "../utils/colors";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import PositionComponent from "../components/Positions";
import ActivitiesComponent from "../components/Activities";
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from "@material-ui/core/TableBody";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ChartComponent from "../components/Charts";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Copyright from "./shared/footer";
import Box from "@material-ui/core/Box";
import {Card, CardContent, CardHeader, Grid, Typography} from '@material-ui/core';
import Sidebar from "../components/Sidebar/index"
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        grid: {
            paddingTop: theme.spacing(4),
        },
        spotlight: {
            background: '-webkit-linear-gradient(top, #FBB276, #E5A46F)',
            color: '#f6f6f6'
        },
        altSpotlight: {
            background: '-webkit-linear-gradient(top, #FFFFFF, #F6F6F6)',
            color: 'black'
        }
    })
);

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;
const Positions = () => {
    const [positions, setPositions] = useState([]);
    const [history, setHistory] = useState({});
    const [accounts, setAccounts] = useState({current_balance: 0});
    const [total, setTotal] = useState(0);
    const [activities, setActivities] = useState([]);
    const [colors, setColors] = useState({monetary: "black", percentage: "black"});

    let accountId = 0;

    if (ipcRenderer) {
        accountId = ipcRenderer.sendSync('get-messages');
    }

    const currencyFormat = (value) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);

        // Get the Positions Data and the Account Data
        // Get the History Data and Activities Data
    useEffect(() => {
        let interval = 0;
        // If not chosen an account, redirects to choose accounts page
        if (!accountId) {
            Router.push('/choose-account');
        }
        if (ipcRenderer) {
            ipcRenderer.once('positions-reply', (event, arg) => {
                let posResp = JSON.parse(arg)
                setPositions(posResp.data.positions);
                ipcRenderer.on('account-data-reply', (event, arg) => {
                    let accountResp = JSON.parse(arg)
                    setAccounts(accountResp.data);
                    setTotal(parseInt(posResp.data.total) + parseInt(accountResp.data.current_balance.amount))
                })
                ipcRenderer.send('account-data', accountId)
            })
            ipcRenderer.send('positions', accountId)
            interval = setInterval(() => {
                ipcRenderer.send('positions', accountId)
            }, 90000);
        }

        let areaSeries;
        if (ipcRenderer) {
            ipcRenderer.once('history-reply', (event, arg) => {
                let historyResp = JSON.parse(arg)
                setHistory(historyResp.data);
                areaSeries = ChartComponent("charts", historyResp.data.chart);
                ipcRenderer.once('activities-reply', (event, arg) => {
                    const activityResp = JSON.parse(arg)
                    setActivities(activityResp.data);
                })
                ipcRenderer.send('activities')
            })
            const params = {
                accountId: accountId,
                time: "1m"
            }
            ipcRenderer.send('history', params)
            interval = setInterval(() => {
                ipcRenderer.once('history-reply', (event, arg) => {
                    let historyResp = JSON.parse(arg)
                    setHistory(historyResp.data);
                    areaSeries.setData(historyResp.data.chart);
                    ipcRenderer.once('activities-reply', (event, arg) => {
                        const activityResp = JSON.parse(arg)
                        setActivities(activityResp.data);
                    })
                    ipcRenderer.send('activities')
                })
                const params = {
                    accountId: accountId,
                    time: "1m"
                }
                ipcRenderer.send('history', params)
            }, 90000);
        }

        return () => {
            ipcRenderer.removeAllListeners('positions')
            ipcRenderer.removeAllListeners('positions-reply')
            ipcRenderer.removeAllListeners('account-data-reply')
            ipcRenderer.removeAllListeners('account-data')
            ipcRenderer.removeAllListeners('activities')
            ipcRenderer.removeAllListeners('activities-reply')
            ipcRenderer.removeAllListeners('history')
            ipcRenderer.removeAllListeners('history-reply')
            clearInterval(interval);
        }

    }, []);

    // Set the Color based on the History Data
    useEffect(() => {
        setColors({
            monetary: colorIndicator(history.monetaryChange),
            percentage: colorIndicator(history.percentChange)
        });
    }, [history]);

    const classes = useStyles({});

    return (
        <React.Fragment>
            <Head>
                <title>Investive</title>Container
            </Head>
            <div className={classes.root}>
                <CssBaseline/>
                <Sidebar/>
                <Container maxWidth="lg" className={classes.content}>
                    {/* TODO: Search not implemented*/}
                    {/*<Topbar/>*/}
                    <Grid container spacing={4} className={classes.grid}>
                        <Grid item xl={6} lg={6} sm={6} xs={6}>
                            <Card className={classes.spotlight}>
                                <CardContent style={{paddingBottom: 12, paddingTop: 12}}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <AccountBalanceWalletOutlinedIcon style={{fontSize: 68}}/>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography> Total Account Value</Typography>
                                            <Typography variant="h4">
                                                {currencyFormat(total)} {accounts.current_balance.currency}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={6} lg={6} sm={6} xs={6}>
                            <Card className={classes.altSpotlight} style={{backgroundColor: '#FAF8FB', color: 'black'}}>
                                <CardContent style={{paddingBottom: 12, paddingTop: 12}}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <ShowChartIcon style={{fontSize: 68}}/>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h4">
                                                ${history.monetaryChange}(<span
                                                style={{color: colors.percentage}}>{history.percentChange >= 0 ? "+" : ""}{history.percentChange}%</span>)
                                            </Typography>
                                            Over the Last 30 Days
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <Card>
                                <CardHeader title="Portfolio Value Over Time"/>
                                <CardContent>
                                    <div id="charts"/>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <Card>
                                <CardHeader title="Portfolio"/>
                                <CardContent>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell/>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Symbol</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Average Price</TableCell>
                                                <TableCell>Book Value</TableCell>
                                                <TableCell>Current Price</TableCell>
                                                <TableCell>Market Value</TableCell>
                                                <TableCell>% of Portfolio</TableCell>
                                                <TableCell align="right">Open P&L</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {positions.map((position) => (
                                                <PositionComponent key={position.id} position={position} total={total}/>
                                            ))
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <Card>
                                <CardHeader title="Activities"/>
                                <CardContent>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Message</TableCell>
                                                <TableCell>Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <ActivitiesComponent activities={activities}/>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </React.Fragment>
    );
};

export default Positions;
