import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from "../Link";
import electron from "electron";

import clsx from 'clsx';
import {makeStyles, withStyles} from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import {Typography} from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Chip from "@material-ui/core/Chip";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import MenuIcon from '@material-ui/icons/Menu';
import Box from "@material-ui/core/Box";
import CopyrightIcon from '@material-ui/icons/Copyright';

const styles = (theme) => ({
    itemPrimary: {
        fontSize: 'inherit',
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
});

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        textAlign: 'center',
    },
    drawerPaper: {
        width: drawerWidth,
        background: theme.palette.primary.dark,
        color: 'rgba(255, 255, 255, 1)',

    },
    investive: {
        textAlign: 'left',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
    },
    name: {},
    grey: {
        color: '#bbb',

    },
    avatarList: {
        marginTop: -60,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        justifyContent: "center",
        display: "flex"
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        background: '-webkit-radial-gradient(bottom left, rgba(251, 178, 118, 1.0), rgba(143, 93, 103, 1.0))',
        border: '7px solid',
        borderColor: theme.palette.primary.dark,
        borderRadius: '50%',
        color: 'rgba(255, 255, 255, 0.65)'
    },
    logo: {
        marginTop: '120%',
        maxWidth: '170px',
        margin: '0 auto'
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
        color: "inherit"
    },
    first: {
        marginBottom: theme.spacing(3)
    },
    chip: {
        backgroundColor: theme.palette.primary.dark,
    },
    menu: {
        alignItems: 'right',
    },
    lighter: {
        background: '-webkit-linear-gradient(bottom, #8F5D67, #754B53)',
        backgroundColor: theme.palette.primary.main,
        paddingBottom: theme.spacing(6),
    },
    item: {
        paddingLeft: theme.spacing(4),
        transition: 'all 0.5s ease',
        //This messes up the small nav
        // margin: theme.spacing(2),
        color: "#ddd",
        borderRadius: 50,

        '&:hover': {
            background: "#53363c",
            color: "#fff",
        },
    },
    list: {},
    divider: {
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4)
    },
    disclaimer: {
        color: '#ddd',
        marginTop: theme.spacing(4)

    },
    copyright: {
        position: 'fixed',
        bottom: 50,
        left: 68,
        display: 'flex',
        alignItems: 'center',
    },
    sideImage: {
        margin: '0 auto',
        paddingTop: 40,
        maxWidth: '30%',
        objectFit: "cover",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    hide: {
        display: 'none',
    },

}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const ipcRenderer = electron.ipcRenderer || false;


function Sidebar() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if (ipcRenderer) {
            const account = ipcRenderer.sendSync('get-messages', 'account')
            setName(account[0]);
            setEmail(account[1]);
        }
    });

    const classes = useStyles({});

    return (
        <Drawer variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx(classes.drawerPaper, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                anchor="left">
            <div className={clsx(classes.lighter, {
                [classes.hide]: !open,
            })}>
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box m={1}>
                        INVESTIVE
                    </Box>
                    <Box m={1}>
                        <Chip
                            size="small"
                            icon={<NewReleasesIcon/>}
                            label="beta"
                            color="primary"
                            className={classes.chip}
                        /></Box>
                    <Box width="100%"></Box>
                    <Box m={1}>
                        <MenuIcon className={classes.menu} onClick={handleDrawerClose}/>
                    </Box>
                </Box>
                <Typography>{name}</Typography>
                <Typography variant="subtitle2" className={classes.grey}>{email}</Typography>
            </div>
            <div className={clsx(classes.avatarList, {
                [classes.hide]: !open,
            })}>
                <StyledBadge overlap="circle" anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                             variant="dot">
                    <Avatar alt="user avatar" className={classes.avatar}>
                        <PersonOutlineIcon fontSize="large"/>
                    </Avatar>
                </StyledBadge>
            </div>

            {/* Start Nav List*/}
            <List disablePadding className={classes.list}>
                <ListItem className={classes.item}>
                    <ListItemIcon className={classes.itemIcon}>
                        <MenuIcon className={clsx(classes.menu, {
                            [classes.hide]: open,
                        })} onClick={handleDrawerOpen}/>
                    </ListItemIcon>
                </ListItem>

                <Link href="/choose-account">
                    <ListItem className={clsx(classes.item, classes.itemCategory)}>
                        <ListItemIcon className={classes.itemIcon}>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.itemPrimary,
                            }}
                        >
                            Change Account
                        </ListItemText>
                    </ListItem>
                </Link>
                {/* TODO: Feedback form not implemented yet*/}
                {/*<Link href="/">*/}
                {/*    <ListItem className={clsx(classes.item, classes.itemCategory)}>*/}
                {/*        <ListItemIcon className={classes.itemIcon}>*/}
                {/*            <FeedbackIcon/>*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText*/}
                {/*            classes={{*/}
                {/*                primary: classes.itemPrimary,*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Feedback*/}
                {/*        </ListItemText>*/}
                {/*    </ListItem>*/}
                {/*</Link>*/}
                <Link href="/login">
                    <ListItem className={clsx(classes.item, classes.itemCategory)}>
                        <ListItemIcon className={classes.itemIcon}>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.itemPrimary,
                            }}
                        >
                            Log Out
                        </ListItemText>
                    </ListItem>
                </Link>
            </List>
            <Divider className={classes.divider}/>
            <div className={clsx({
                [classes.hide]: !open,
            })}>
                <img src='images/one-leaf.png' alt="a pretty leaf" className={classes.sideImage}/>
                <div className={classes.disclaimer}>
                    <Typography variant="body2" gutterBottom>
                        Investive is currently in a view only mode.
                    </Typography>
                </div>
                <div className={clsx(classes.copyright, classes.grey)}>
                    <CopyrightIcon fontSize="small"/> &nbsp; {new Date().getFullYear()} Investive
                </div>
            </div>
        </Drawer>
    );
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
