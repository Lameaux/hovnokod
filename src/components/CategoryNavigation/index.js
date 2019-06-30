import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import Toolbar from "@material-ui/core/Toolbar";
import Link from '@material-ui/core/Link';
import withStyles from "@material-ui/styles/withStyles/withStyles";

import { CATEGORIES } from '../../constants/categories';

const styles = theme => ({
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    toolbarLinkActive: {
        ...theme.toolbarLink,
        fontWeight: 'bolder',
    }
});

class CategoryNavigation extends Component {
    render() {
        const { classes, selected } = this.props;

        return (
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                <Link
                    color="inherit"
                    noWrap
                    variant="body2"
                    className={
                        selected === 'all'
                            ? classes.toolbarLinkActive
                            : classes.toolbarLink
                    }
                    component={RouterLink}
                    to="/"
                >
                    Všechno
                </Link>
                {Object.keys(CATEGORIES).map(category => (
                    <Link
                        color="inherit"
                        noWrap
                        key={category}
                        variant="body2"
                        className={
                            selected === category
                                ? classes.toolbarLinkActive
                                : classes.toolbarLink
                        }
                        component={RouterLink}
                        to={'/' + category}
                    >
                        {CATEGORIES[category]}
                    </Link>
                ))}
            </Toolbar>
        );
    }
}

export default withRouter(withStyles(styles)(CategoryNavigation));
