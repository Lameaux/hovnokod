import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import CATEGORIES from '../../constants/categories';
import {RECAPTCHA_PUBLIC_KEY, SITE_URL} from '../../constants/settings' ;

import Snackbar from '../Snackbar';

import history from '../History';

import { load } from 'recaptcha-v3'



const useStyles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default ({open, setOpen}) => {
    const classes = useStyles();

    const initialState = {
        category: 'other',
        description: '',
        code: '',
        recaptcha: '',
        loading: false,
    };

    const [state, setState] = useState(initialState);

    const setSnackOpen = (open) => setSnack(prev => ({...prev, open: open}));

    const [snack, setSnack] = useState({
        open: false,
        setOpen: setSnackOpen,
        variant: 'success',
        message: '',
    });

    const handleClose = () => setOpen(false);

    const showSnackError = (message) => {
        setSnack({
            open: true,
            setOpen: setSnackOpen,
            variant: 'error',
            message: message,
        })
    };

    const showSnackSuccess = (message) => {
        setSnack({
            open: true,
            setOpen: setSnackOpen,
            variant: 'success',
            message: message,
        })
    };

    const handleSave = () => {
        if (state.code.length === 0) {
            showSnackError('Zdrojový kód je prázdný');
            return;
        }

        if (state.recaptcha.length === 0) {
            showSnackError('Nejste robot?');
            return;
        }

        setLoading(true);

        fetch(`${SITE_URL}/api/code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),

        }).then(res => {
            if (!res.ok) {
                setLoading(false);
                showSnackError(res.statusText);
                return;
            }

            setState(initialState);
            showSnackSuccess('Zdrojový kód byl úspěšně odeslán');
            handleClose();

            return res.json();
        }).then(json => {
            if (json.id !== undefined) {
                history.push('/' + json.id);
            }
        }).catch(err => {
            setLoading(false);
            showSnackError(err);
        });
    };

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const setLoading = (value) => {
        setState({
            ...state,
            loading: value,
        });
    };

    useEffect(() => {
        load(RECAPTCHA_PUBLIC_KEY, {autoHideBadge: true}).then((recaptcha) => {
            recaptcha.execute('addCode').then((token) => {
                setState(prev => ({...prev, recaptcha: token}));
            })
        });
    }, []);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Vložit zdroják</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Váš příspěvek se zobrazí až po schválení moderátorem.
                    </DialogContentText>

                    <FormControl fullWidth>
                        <InputLabel shrink htmlFor="category-native-label-placeholder">
                            Kategorie
                        </InputLabel>
                        <NativeSelect
                            value={state.category}
                            onChange={handleChange('category')}
                            input={<Input name="category" id="category-native-label-placeholder" />}
                        >
                            {
                                Object.keys(CATEGORIES).map(category => (
                                    <option key={category} value={category}>{CATEGORIES[category]}</option>
                                ))
                            }
                        </NativeSelect>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Zdrojový kód"
                        type="text"
                        multiline={true}
                        rows={10}
                        fullWidth
                        value={state.code}
                        onChange={handleChange('code')}
                        inputProps={{
                            maxLength: 5000
                        }}
                    />

                    <TextField

                        margin="dense"
                        id="description"
                        label="Popisek"
                        type="text"
                        multiline={true}
                        rows={3}
                        fullWidth
                        value={state.description}
                        onChange={handleChange('description')}
                        inputProps={{
                            maxLength: 1000
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    { state.loading && <CircularProgress size={24} /> }

                    {
                        !state.loading &&
                        <>
                            <Button color="primary" onClick={handleClose}>
                                <CloseIcon className={classes.leftIcon} />
                                Zavřít
                            </Button>
                            <Button color="primary" onClick={handleSave}>
                                <CodeIcon className={classes.leftIcon}/>
                                Odeslat
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
            <Snackbar {...snack} />
        </div>
    );
}
