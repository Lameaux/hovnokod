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

export default function ConditionsPage() {
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
                                    Podmínky použití
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    Provozovatel nezaručuje, že informace publikované na internetové adrese http://hovnokod.cz jsou pravdivé, správné, úplné a aktuální. Z toho důvodu provozovatel neodpovídá za škodu nebo jinou újmu, která by uživateli uvedených stránek mohla vzniknout v důsledku užití takových informací. Provozovatel dále nenese žádnou odpovědnost za obsah internetových stránek třetích subjektů, na které jeho stránky odkazují.
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    Provozovatel neodpovídá za informace nebo obsah materiálů, které na jeho stránky umístí třetí osoby, a to bez ohledu na skutečnost, zda se tak stane s jeho vědomím nebo nikoliv. Provozovatel si však vyhrazuje právo odstranit z internetových stránek jakékoliv informace nebo materiály, které na jeho stránky umístí třetí osoby, a to bez udání důvodu.
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
