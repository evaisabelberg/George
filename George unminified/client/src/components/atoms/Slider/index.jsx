import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import Text from '../Text';
import { connect } from 'react-redux';
import { controlHomeseerByValue } from '../../../actions/actions';

class SimpleSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    handleChange = (event, value) => {
        const valueNumber = Number(value.toFixed(0));
        this.setState({ value: valueNumber });
    };
    onControlRelease = (deviceref, value) => {
        this.props.controlHomeseerByValue(deviceref, value);
    }
    render() {
        const { RangeStatusPrefix, RangeStatusSuffix } = this.props.range;
        const { deviceref } = this.props;
        const value = this.state.value;
        return (
            <div>
                <Text id="label">{RangeStatusPrefix + value + RangeStatusSuffix}</Text>
                <Slider
                    value={value}
                    aria-labelledby="label"
                    onChange={this.handleChange}
                    onMouseUp={() => this.onControlRelease(deviceref, value)}
                />
            </div>
        );
    }
}

SimpleSlider.propTypes = {
    value: PropTypes.number.isRequired,
    controlHomeseerByValue: PropTypes.func.isRequired
};

export default connect(null, { controlHomeseerByValue })(SimpleSlider);
