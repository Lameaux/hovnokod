import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { withFirebase } from '../Firebase';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import CategoryNavigation from "../CategoryNavigation";
import CodeCard from "../CodeCard";
import Loading from "../Loading";

const CODES_PER_PAGE = 20;

class HomePage extends Component {
    state = {
        codes: [],
        loading: false,
        loadMore: false,
    };

    _mounted = false;

    componentDidMount() {
        this._mounted = true;

        this.loadCodes();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    loadCodes = () => {
        this.setState({loading: true, loadMore: false});

        let codesRef = this.props.firebase.codes()
            .orderBy('created', 'desc');

        if (this.state.codes.length > 0) {
            let lastCode = this.state.codes[this.state.codes.length - 1];
            codesRef = codesRef.startAfter(lastCode.created);
        }

        codesRef.limit(CODES_PER_PAGE).get().then(
            snapshot => {

                let list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });

                this.updateCodes(list);
            }
        );
    };

    updateCodes = (codes) => {
        if (!this._mounted) return;

        this.setState(prev => ({
            loading: false,
            loadMore: codes.length === CODES_PER_PAGE,
            codes: prev.codes.concat(codes),

        }));
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />

                <Container maxWidth="lg">
                    <PageHeader />
                    <CategoryNavigation selected="all" />
                    <h1>Nejnovější příspěvky</h1>
                    <main>
                        <Grid container spacing={4}>
                            {
                                this.state.codes.map(
                                    code => <CodeCard key={code.id} code={code} />
                                )
                            }
                        </Grid>
                    </main>
                    <Box display="flex" justifyContent="center" m={3}>
                        { this.state.loading && <Loading /> }
                        { this.state.loadMore && <Button onClick={this.loadCodes}>Načíst další</Button> }
                    </Box>
                </Container>
                <PageFooter />
            </React.Fragment>
        );
    }
}

export default withFirebase(HomePage);
