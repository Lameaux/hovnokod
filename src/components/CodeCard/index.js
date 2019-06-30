import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CATEGORIES } from "../../constants/categories";
import CodeBlock from "../CodeBlock";

const styles = theme => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
});

class CodeCard extends Component {
    render() {
        const { classes, code } = this.props;

        const codeTitle = CATEGORIES[code.category_id] + ' #' + code.id;

        return (
            <Grid item key={code.id} xs={12}>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {codeTitle}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {code.description}
                            </Typography>
                            <CodeBlock language={code.category_id} value={code.code} />
                            <Typography variant="subtitle1" color="textSecondary">
                                {code.created}
                            </Typography>
                            {/*
                                <Typography variant="subtitle1" color="primary">
                                    <Link component={RouterLink} to={'/' + code.id}>Přidat komentář</Link>
                                </Typography>
                            */}
                        </CardContent>
                    </div>
                </Card>
            </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(CodeCard));
