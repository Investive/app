import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import idToLabel from "../../utils/labels";
import formatDate from "../../utils/dates";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({}));


function displayActivities(activity, classes) {

    if (activity.object === "deposit") {
        return (
            <React.Fragment>
                <TableCell>
                    {activity.status} <br/> {idToLabel(activity.account_id)}
                </TableCell>
                <TableCell>
                    You deposited {activity.value.amount} {activity.value.currency} into
                    your {idToLabel(activity.account_id)}
                </TableCell>
                <TableCell>
                    {formatDate(activity.created_at)}
                </TableCell>
            </React.Fragment>
        )
    } else if (activity.object === "order") {
        return (
            <React.Fragment>
                <TableCell>
                    {idToLabel(activity.status)}<br/> {idToLabel(activity.account_id)}
                </TableCell>
                <TableCell>
                    You {idToLabel(activity.order_type)} {activity.quantity} shares
                    of {activity.security_name} ({activity.symbol})
                    for {activity.account_value == null ? "canceled" : activity.account_value.amount}
                    {activity.account_value == null ? "" : activity.account_value.currency}
                </TableCell>
                <TableCell>
                    {formatDate(activity.created_at)}
                </TableCell>
            </React.Fragment>
        )
    }
}

const ActivitiesComponent = ({activities}) => {
    const classes = useStyles();

    return (
        <TableBody>
            {activities.map((activity, index) =>
                <TableRow hover key={index} variant="outlined">
                    {displayActivities(activity, classes)}
                </TableRow>
            )}
        </TableBody>
    )
}

export default ActivitiesComponent;
