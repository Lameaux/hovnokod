import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const logo = require('../../images/hovno.png');

const styles = theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
});

class PageHeader extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Toolbar className={classes.toolbar}>
                <img src={logo} alt="Logo" />
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    className={classes.toolbarTitle}
                >

                    <Link underline="hover" color="textPrimary" component={RouterLink} to="/">
                        hovnokod.cz
                    </Link>
                </Typography>
                <Typography>
                    v3.0.alpha
                </Typography>
            </Toolbar>
        )
    }
}

export default withRouter(withStyles(styles)(PageHeader));