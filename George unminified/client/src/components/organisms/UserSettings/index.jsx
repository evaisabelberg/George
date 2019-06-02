import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import ImgContainer from '../../atoms/ImgContainer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ListContainer from '../../atoms/ListContainer';
import ListItem from '@material-ui/core/ListItem';
import List from './List';
import { userIsLoggedIn, setUserOrder } from '../../../actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';

class UserSettings extends Component {
    constructor(props) {
        super(props);
        axios
            .get('/api/users/' + this.props.user.username)
            .then(res => {
                this.setState({ order: res.data[0].order });
            })
            .catch(err => {
                throw err;
            });
    }
    state = {
        open: false,
        errorMsg: '',
        order: []
    };
    onDragStart = (e, index) => {
        this.draggedItem = this.state.order[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };
    onTouchStart = (e, index) => {
        this.draggedItem = this.state.order[index];
        e.touches[0].effectAllowed = "move";
    };

    onDragOver = index => {
        const draggedOverItem = this.state.order[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let order = this.state.order.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        order.splice(index, 0, this.draggedItem);

        this.setState({ order });
    };

    onDragEnd = () => {
        this.draggedIdx = null;
        const user = this.props.user.username;
        this.props.setUserOrder(user, this.state.order);

    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, errorMsg: '' });
    };
    locations = (devices) => {
        const set = new Set();
        devices.map(device => (
            set.add(device.location)
        ));
        return Array.from(set);
    }
    logout = () => {
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        this.props.userIsLoggedIn(false, '');
        this.setState({ open: false});
    }
    render() {
        const { user } = this.props;
        const order = this.state.order;
        return (
            <Fragment>
                <Button settings onClick={this.handleClickOpen} />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    id='settings-dialog'
                >
                    <DialogTitle id="form-dialog-title">{user.username}</DialogTitle>
                    <DialogContent className='dialogContent'>
                        <ExpansionPanel className='locations'>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Text>Priorities</Text>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ListContainer className='devices'>
                                    {order.map((item, idx) => {
                                        return (
                                            <ListItem key={'user_' + item.location} onDragOver={() => this.onDragOver(idx)} onTouchMove={() => this.onDragOver(idx)} >
                                                <Text prominent>{item.location}</Text>
                                                <div
                                                    draggable
                                                    onDragStart={e => this.onDragStart(e, idx)}
                                                    onDragEnd={this.onDragEnd}
                                                    onTouchStart={e => this.onTouchStart(e, idx)}
                                                    onTouchEnd={this.onDragEnd}
                                                >
                                                    <Button moveHandle />
                                                </div>
                                            </ListItem>
                                        );
                                    })}
                                </ListContainer>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Button className='logout-btn' onClick={this.logout}>Logout</Button>
                    </DialogContent>
                    <DialogActions>
                        <Button className='secondary-btn' onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

UserSettings.propTypes = {
    userIsLoggedIn: PropTypes.func.isRequired,
    setUserOrder: PropTypes.func.isRequired,
    home: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    home: state.home,
    user: state.user
});

export default connect(mapStateToProps, { userIsLoggedIn, setUserOrder })(UserSettings);
