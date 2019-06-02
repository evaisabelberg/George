import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentBar from '../../atoms/ContentBar';
import Title from '../../atoms/Title';
import Text from '../../atoms/Text';
import TextSpan from '../../atoms/TextSpan';
import RaisedButton from 'material-ui/RaisedButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ListContainer from '../../atoms/ListContainer';
import ListItem from '@material-ui/core/ListItem';
import FlexBox from '../../atoms/FlexBox';
import Loading from '../Loading';

class ConfirmSetup extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    locations = (devices) => {
        const set = new Set();
        devices.map(device => (
            set.add(device.location)
        ));
        return Array.from(set);
    }
    render() {
        const { values, title, handleClick, loading } = this.props;
        const devices = values.selectedDevices;
        const locations = this.locations(devices);
        return (
            <MuiThemeProvider>
                <Fragment>
                    {loading === true ? <Loading open={loading} /> : null}
                    <ContentBar>
                        <Title>George setup: {title}</Title>
                        <Text error>{values.errorMsg}</Text>
                    </ContentBar>
                    <FlexBox>
                        <ExpansionPanel className='expansionPanel'>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Devices</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className='expansionDetails'>
                                {locations.map(location => (
                                    <ExpansionPanel key={location} className='expansionPanel'>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>{location}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <ListContainer className='devices'>
                                                <ListItem>
                                                    <Text bold>Name</Text>
                                                    <Text bold>Controls</Text>
                                                </ListItem>
                                                { values.selectedDevices.filter(device => device.location === location).map(function(device) {
                                                    return(
                                                        <ListItem
                                                            key={device.ref}
                                                            className='device'
                                                        >
                                                            <Text>{device.name}</Text>
                                                            <Text>
                                                                {device.controls ? device.controls.map(function(control) {
                                                                    return(
                                                                        <TextSpan key={control.Label}>{control.Label}</TextSpan>
                                                                    )
                                                                }) : 'No controls'}
                                                            </Text>
                                                        </ListItem>
                                                    )
                                                }) }
                                            </ListContainer>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ))}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel className='expansionPanel'>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Users</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ListContainer className='users'>
                                    { values.users.map(function(user) {
                                        return(
                                            <ListItem
                                                id={user.id}
                                                key={user.id}
                                                className='user'
                                            >
                                                <Text>{user.username}</Text>
                                            </ListItem>
                                        )
                                    }) }
                                </ListContainer>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </FlexBox>
                    <RaisedButton
                        label='Back'
                        className='nav-btn'
                        onClick={this.back}
                    />
                    <RaisedButton
                        label='Confirm'
                        className='nav-btn'
                        primary={true}
                        onClick={handleClick()}
                    />
                </Fragment>
            </MuiThemeProvider>
        )
    }
}

export default ConfirmSetup;
