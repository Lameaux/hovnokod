import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';

const banner = require('../../images/hovno.png');

const styles = theme => ({
    banner: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    bannerLeft: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
        },
    },
    bannerRight: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
        },
    },
});

class Banner extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.banner}>
                {/* Increase the priority of the hero background image */}
                {
                    <img
                        style={{ display: 'none' }}
                        src={banner}
                        alt="background"
                    />
                }
                <div className={classes.overlay} />
                <Grid container>
                    <Grid item md={8}>
                        <div className={classes.bannerLeft}>
                            <Typography variant="h5" color="inherit" paragraph>
                                Narazili jste na zprasený kód?
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item md={4}>
                        <div className={classes.bannerRight}>
                            <Link variant="subtitle1" href="#">
                                <Button variant="contained" size="large">
                                    Nahrajte ho sem!
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withRouter(withStyles(styles)(Banner));
