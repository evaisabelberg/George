import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { userIsLoggedIn } from '../../../actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';

class Login extends Component {
    state = {
        open: false,
        errorMsg: ''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, errorMsg: '' });
    };

    handleLoginRequest = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        axios
            .post('api/users/' + username, {
                password
            })
            .then(res => {
                if(res.data === true) {
                    document.cookie = 'user=' + username + '; max-age=86400 * 365';
                    this.setState({ open: false});
                    this.props.userIsLoggedIn(true, username);
                }
                else {
                    this.setState({ errorMsg: 'Incorrect username or password.'});
                }
            })
            .catch(err => {
                throw err;
            });
    }
    render() {
        return (
            <Fragment>
                <Button guest onClick={this.handleClickOpen} />
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <Text error>{this.state.errorMsg}</Text>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleLoginRequest}>
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

Login.propTypes = {
    userIsLoggedIn: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    home: state.home,
    user: state.user
});

export default connect(mapStateToProps, { userIsLoggedIn })(Login);
