import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        width: `100%`,
    },
    nav: {
        color: theme.palette.common.black,
        background: theme.palette.common.white,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    titleText: {
        color: theme.palette.font.default,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.primary.main, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Topbar() {
    const classes = useStyles();

    return (
        <AppBar position="static" elevation={0} className={classes.root}>
            <Toolbar className={classes.nav}>
                <Typography className={classes.title} variant="h5" noWrap>
                </Typography>
                {/* Search Bar not Implemented yet */}
                {/*<div className={classes.search}>*/}
                {/*    <div className={classes.searchIcon}>*/}
                {/*        <SearchIcon/>*/}
                {/*    </div>*/}
                {/*    <InputBase*/}
                {/*        placeholder="Search…"*/}
                {/*        classes={{*/}
                {/*            root: classes.inputRoot,*/}
                {/*            input: classes.inputInput,*/}
                {/*        }}*/}
                {/*        inputProps={{'aria-label': 'search'}}*/}
                {/*    />*/}
                {/*</div>*/}
            </Toolbar>
        </AppBar>
    );
}
