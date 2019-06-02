import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import RaisedButton from 'material-ui/RaisedButton';
import Text from '../../atoms/Text';
import FlexBox from '../../atoms/FlexBox';
import Title from '../../atoms/Title';
import ContentBar from '../../atoms/ContentBar';
import ListContainer from '../../atoms/ListContainer';
import ListItem from '@material-ui/core/ListItem';
import Loading from '../Loading';
import { connect } from 'react-redux';

class DevicesForm extends Component {
    locations = (devices) => {
        const set = new Set();
        devices.map(device => {
            set.add(device.location);
            return device;
        });
        return Array.from(set);
    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { devices, loading } = this.props.home;
        const locations = this.locations(devices).sort();
        const { values, handleChange, title } = this.props;
        return (
            <Fragment>
                {loading === true ? <Loading open={loading} /> : null}
                <MuiThemeProvider>
                    <Fragment>
                        <ContentBar>
                            <Title>George setup: {title}</Title>
                            <Text error>{values.errorMsg}</Text>
                        </ContentBar>
                        <FlexBox>
                            {locations.map(location => (
                                <ExpansionPanel className='location' key={location}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{location}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <ListContainer className='devices'>
                                            <ListItem>
                                                <Text bold>Name</Text>
                                                <Text bold>Status</Text>
                                            </ListItem>
                                            { devices.filter(device => device.location === location).map(function(device) {
                                                return(
                                                    <ListItem
                                                        key={device.ref}
                                                        button
                                                        selected={values.selectedDevices.some(item => item.ref === device.ref)}
                                                        onClick={handleChange(device.ref, location, device.name, device.status, device.value)}
                                                        id={device.ref}
                                                        className='device'
                                                    >
                                                        <Text name='true'>{device.name}</Text>
                                                        <Text status>{device.status}</Text>
                                                    </ListItem>
                                                )
                                            }) }
                                        </ListContainer>
                                    </ExpansionPanelDetails>
                            </ExpansionPanel>
                            ))}
                        </FlexBox>
                        <FlexBox>
                            <RaisedButton
                                label='Continue'
                                className='nav-btn'
                                primary={true}
                                onClick={this.continue}
                            />
                        </FlexBox>
                    </Fragment>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    home: state.home // home from root reducer
});

export default connect(mapStateToProps, null)(DevicesForm);
