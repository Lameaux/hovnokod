import React from 'react';

import CategoryNavigation from '../CategoryNavigation';
import {makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import PageHeader from "../PageHeader";
import PageFooter from "../PageFooter";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
}));

export default function Error404Page() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />

            <Container maxWidth="lg">
                <PageHeader />
                <CategoryNavigation />
                <main>
                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography component="h1" variant="h4" paragraph>
                                    404 - Stránka nebyla nalezena
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    Zkontrolujte prosím tvar adresy v adresovém řádku Vašeho prohlížeče.
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </main>
            </Container>

            <PageFooter />
        </React.Fragment>
    );
}
