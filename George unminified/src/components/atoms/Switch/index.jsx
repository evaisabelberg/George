import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { controlHomeseerByLabel } from '../../../actions/actions';

class SwitchButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    handleChange = (value) => {
        let val = value > 0 ? 0 : 100;
        this.setState({ value: val });
    };
    onControlClick = (deviceref, value) => {
        let label;
        if(value === 0) {
            label = 'On';
        } else {
            label = 'Off';
        }
        this.props.controlHomeseerByLabel(deviceref, label);
    }
    render() {
        const { deviceref } = this.props;
        const value = this.state.value;
        const checked = value > 0 ? true : false;
        return (
            <Switch
                color='primary'
                checked={checked}
                value={value}
                onClick={() => this.onControlClick(deviceref, value)}
                onChange={() => this.handleChange(value)}
            />
        );
    }
}

SwitchButton.propTypes = {
    value: PropTypes.number.isRequired,
    controlHomeseerByLabel: PropTypes.func.isRequired
};

export default connect(null, { controlHomeseerByLabel })(SwitchButton);
