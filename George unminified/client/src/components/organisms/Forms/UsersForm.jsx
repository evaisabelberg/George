import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import ListContainer from '../../atoms/ListContainer';
import Text from '../../atoms/Text';
import Title from '../../atoms/Title';
import FlexBox from '../../atoms/FlexBox';
import ContentBar from '../../atoms/ContentBar';
import TextInput from '../../atoms/TextInput';
import ListItem from '@material-ui/core/ListItem';
import Loading from '../Loading';

class UsersForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    addUser = (inputs) => e => {
        e.preventDefault();
        // insert another FormListItem with id last-child-id + 1
        const array = document.getElementById('userInputs').getElementsByClassName('userInput');
        const username = array[0];
        const password = array[1];
        const usernameValue = array[0].value;
        const passwordValue = array[1].value;
        if(usernameValue !== '' && passwordValue !== '') {
            console.log('not null');
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
    render() {
        const { values, handleChange, handleClick, title, loading } = this.props;
        const inputs = [{type: 'text', name:'Username', handleChange: handleChange()},
                        {type: 'password', name: 'Password'}];
        const key = values.users.length + 1;
        return (
            <Fragment>
                {loading === true ? <Loading open={loading} /> : null}
                <MuiThemeProvider>
                    <Fragment>
                        <ContentBar>
                            <Title>George setup: {title}</Title>
                            <Text error>{values.errorMsg}</Text>
                        </ContentBar>
                        <ListContainer id='users' className='users'>
                            {values.users.map(user => (
                                <ListItem key={user.id} className='user'>
                                    <Text>{user.username}</Text>
                                </ListItem>
                            ))}
                        </ListContainer>
                        <FlexBox key={key} id={'user' + key} className='userSet'>
                            {inputs.map(input => (
                                <TextInput
                                    key={input.name}
                                    type={input.type}
                                    placeholder={input.name}
                                    onChange={input.handleChange}
                                    className='userInput'
                                />
                            ))}
                            <RaisedButton
                                className='tertiary-btn'
                                label='Add user'
                                onClick={handleClick(key)}
                            />
                        </FlexBox>
                        <RaisedButton
                            label='Back'
                            className='nav-btn'
                            onClick={this.back}
                        />
                        <RaisedButton
                            label='Continue'
                            className='nav-btn'
                            primary={true}
                            onClick={this.continue}
                        />
                    </Fragment>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

export default UsersForm;
