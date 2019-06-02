import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DevicesForm from '../organisms/Forms/DevicesForm';
import UsersForm from '../organisms/Forms/UsersForm';
import ConfirmSetup from '../organisms/Forms/ConfirmSetup';
import { setDefaultView } from '../../actions/actions';
import axios from 'axios';
import { connect } from 'react-redux';
import keys from '../../server/config/keys.js';

class SetupForm extends Component {
    state = {
        step: 1,
        selectedDevices: [],
        users: [],
        errorMsg: ''
    }
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }
    handleDevices = (ref, location, name, status, value) => e => {
        this.setState({errorMsg: ''});
        if(!this.state.selectedDevices.some(item => item.ref === ref)) {
            axios
                .get(keys.hsURI + keys.getControl + ref)
                .then(res => {
                    let range;
                    let hasRange = false;
                    if(res.data.ControlPairs) {
                        res.data.ControlPairs.map(control => {
                            control.Label.includes('%') ? hasRange = true : hasRange = false;
                            control.Range ? range = control.Range : range = null;
                            return control;
                        });
                    }
                    const obj = {ref: ref, name: name, controls: res.data.ControlPairs ? res.data.ControlPairs : null, range: res.data.ControlPairs ? range : null, hasRange: hasRange, location: location, status: status, value: value};
                    this.setState({selectedDevices: [...this.state.selectedDevices, obj]});
                })
        }
        else if(this.state.selectedDevices.some(item => item.ref === ref)) {
            const array = [...this.state.selectedDevices];
            const index = array.findIndex(item => item.ref === ref);
            array.splice(index, 1);
            this.setState({selectedDevices: array });
        }
    }
    handleUsers = () => e => {
        const value = e.target.value;
        if(this.state.users.length > 0){
            if(this.state.users.some(user => user.username === value)){
                this.setState({errorMsg: 'Username is not unique'});
            }
            else {
                this.setState({errorMsg: ''});
            }
        }
    }
    addUser = (id) => e => {
        e.preventDefault();
        const parent = document.getElementById('user'+id);
        const username = parent.getElementsByClassName('userInput')[0];
        const password = parent.getElementsByClassName('userInput')[1];
        const usernameValue = username.value;
        const passwordValue = password.value;
        if(usernameValue !== '' && passwordValue !== ''){
            const obj = {id: id, username: usernameValue, password: passwordValue};
            this.setState({users: [...this.state.users, obj]});
        }
        else {
            if(usernameValue === '') {
                username.setAttribute('placeholder', 'INVALID');
            }
            if(passwordValue === '') {
                password.setAttribute('placeholder', 'INVALID');
            }
        }
    }
    locations = (devices) => {
        const set = new Set();
        devices.map(item => (
            set.add(item.location)
        ));
        return Array.from(set);
    }
    confirm = () => e => {
        const devices = this.state.selectedDevices;
        const locations = this.locations(devices);
        const ref = [];
        locations.map(item => {
            ref.push({ location: item });
            return item;
        });
        const users = this.state.users;
        if(devices.length > 0) {
            this.props.setDefaultView(devices);
            if(users.length > 0) {
                users.map(user => (
                    axios
                        .post('/api/users', {
                            username: user.username,
                            password: user.password,
                            order: ref
                        })
                        .catch(err => this.setState({errorMsg: err}))
                ));
            }
        }
        else {
            this.setState({errorMsg: 'Minimum device of one required'});
        }
    }
    render() {
        const { step } = this.state;
        const { selectedDevices, users, text, username, password, errorMsg } = this.state;
        const values = { selectedDevices, users, text, username, password, errorMsg };
        switch(step) {
            case 1:
                return (
                    <DevicesForm
                        nextStep={this.nextStep}
                        handleChange={this.handleDevices}
                        values={values}
                        title='Devices'
                        loading={this.props.home.loading}
                    />
                )
            case 2:
                return (
                    <UsersForm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleUsers}
                        values={values}
                        handleClick={this.addUser}
                        title='Users'
                        loading={this.props.home.loading}
                    />
                )
            case 3:
                return (
                    <ConfirmSetup
                        prevStep={this.prevStep}
                        values={values}
                        title='Confirm'
                        handleClick={this.confirm}
                        loading={this.props.home.loading}
                    />
                )
            default:
                return;
        }
    }
}

SetupForm.propTypes = {
    setDefaultView: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    home: state.home
});

export default connect(mapStateToProps, { setDefaultView })(SetupForm);
