import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0),
    },
});

class PageFooter extends Component {
    render() {
        const { classes } = this.props;

        return (
            <footer className={classes.footer}>
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>
                        &copy; 2012-2019 Lameaux
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p" gutterBottom>
                        <Link  underline="hover" color="textPrimary" component={RouterLink} to="/conditions">
                            Podmínky použití
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                        Rebuilt with React, Firebase and Material-UI. Still under construction.
                    </Typography>
                </Container>
            </footer>
        )
    }
}

export default withRouter(withStyles(styles)(PageFooter));
