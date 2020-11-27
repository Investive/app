import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import colorIndicator from "../../utils/colors";
import {makeStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StockComponent from '../Stock';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const PositionComponent = ({position, total}) => {
    function averagePrice(position) {
        return (position.book_value.amount / position.quantity).toFixed(2)
    }

    function marketValue(position) {
        return (position.quote.amount * position.quantity).toFixed(2)
    }

    const classes = useRowStyles();
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow className={classes.root} onClick={() => setOpen(!open)}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{position.stock.name}</TableCell>
                <TableCell>{position.stock.symbol}</TableCell>
                <TableCell>{position.quantity}</TableCell>
                <TableCell>{averagePrice(position)}</TableCell>
                <TableCell>{position.book_value.amount}</TableCell>
                <TableCell>{(position.quote.amount)}</TableCell>
                <TableCell>{marketValue(position)}</TableCell>
                <TableCell>{((marketValue(position) / total) * 100).toFixed(2)}</TableCell>
                <TableCell align="right"
                           style={{color: colorIndicator((marketValue(position) - position.book_value.amount).toFixed(2))}}>{(marketValue(position) - position.book_value.amount).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <StockComponent position={position}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default PositionComponent;
