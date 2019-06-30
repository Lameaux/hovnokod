import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { CATEGORIES } from '../../constants/categories';
import CategoryNavigation from '../CategoryNavigation';
import CodeBlock from '../CodeBlock';
import withStyles from '@material-ui/styles/withStyles';
import { withFirebase } from '../Firebase';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import PageHeader from "../PageHeader";
import PageFooter from "../PageFooter";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Loading from "../Loading";

const styles = theme => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
});

class CodePage extends Component {
    state = {
        code: null,
        category: null,
        unknown: false,
    };

    _mounted = false;

    componentDidMount() {
        this._mounted = true;

        const { match } = this.props;
        const id = match.url.slice(1);

        const codesRef = this.props.firebase.codes().doc(id);
        codesRef.get().then(this.updateCode);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    updateCode = (code) => {
        if (!this._mounted) return;

        if (!code.exists) {
            this.setState({
                unknown: true
            });

            return;
        }

        const codeData = code.data();

        this.setState({
            code: codeData,
            category_id: codeData.category_id,
        });
    };

    codeTitle = () => {
        if (this.state.code === null) return null;
        return CATEGORIES[this.state.code.category_id] + ' #' + this.state.code.id;
    };

    render() {
        const { classes } = this.props;

        if (this.state.unknown) return <Redirect to="/error404" />;

        return (
            <React.Fragment>
                <CssBaseline/>

                <Container maxWidth="lg">
                    <PageHeader/>
                    <CategoryNavigation selected={this.state.category_id} />
                    <main>
                        {
                            this.state.code === null
                                ? <Loading />
                                : <Card className={classes.card}>
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component="h1" variant="h4" paragraph>
                                                {this.codeTitle()}
                                            </Typography>
                                            <Typography variant="subtitle1" paragraph>
                                                {this.state.code.description}
                                            </Typography>
                                            <CodeBlock language={this.state.code.category_id}
                                                       value={this.state.code.code}/>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {this.state.code.created}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </Card>
                        }
                    </main>
                </Container>

                <PageFooter/>
            </React.Fragment>
        );
    }
}

export default withFirebase(withStyles(styles)(CodePage));
