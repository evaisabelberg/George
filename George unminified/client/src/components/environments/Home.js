import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ListItem from '@material-ui/core/ListItem';
import SimpleSlider from '../atoms/Slider';
import SwitchButton from '../atoms/Switch';
import Header from '../organisms/Header';
import Main from '../atoms/Main';
import { connect } from 'react-redux';
import { userIsLoggedIn, updateHomeseer, getUserOrder, setOrder, updateDefaultView } from '../../actions/actions';
import axios from 'axios';
import keys from '../../server/config/keys.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.getUser();
        this.props.setOrder(this.locations(this.props.home.defaultView));
    }
    componentDidMount() {
        const self = this;
        setInterval(function() {
            self.props.updateHomeseer();
        }, 1000);
        setInterval(() => {
            this.timer();
        }, 3000);
    }
    timer = () => {
        const loggedIn = this.props.user.isLoggedIn;
        if(loggedIn) {
            this.props.getUserOrder(this.props.user.username);
        }
        let order = this.props.home.order;
        const array = []; // defaultView w/ updated values
        const orderObjects = []; //order by motion
        axios
            .get('/api/homeseer')
            .then(res => { // update the default view with new values derived from homeseer devices stored in the database
                const data = res.data[0].devices;
                const defaultView = this.props.home.defaultView;
                defaultView.map(item => {
                    const obj = item;
                    data
                        .filter(device => device.ref === obj.ref)
                        .map(device => {
                            obj.value = device.value;
                            obj.status = device.status;
                            array.push(obj);
                        });
                });
                return data;
            })
            .then(data => { // update the default view in the database with new values
                this.props.updateDefaultView(array);
                return data;
            })
            .then(data => { // find motion sensor for each location
                order.map(item => {
                    data
                        .filter(device => device.location === item && device.name == 'Motion sensor')
                        .map(device => {
                            const motion = device.value > 0 ? true : false;
                            const lastChange = device.last_change.match(/\d+/g).map(Number);
                            const date = new Date(lastChange[0]);
                            const object = {location: device.location, motion: motion, lastChange: date};
                            orderObjects.push(object);
                        });
                });
            })
            .then(() => {
                orderObjects.sort(function(a, b) { // order locations by motion
                    return a.lastChange - b.lastChange
                }).reverse().sort(function(x, y) {
                    return (x.motion === y.motion)? 0 : x.motion? -1 : 1;
                });
                return orderObjects;
            })
            .then(res => { // insert locations without motion last in array
                const temp1 = [];
                const temp2 = [];
                const finalArray = [];
                const locs = this.locations(res);
                locs.map(item => {
                    temp1.push(item);
                });
                if(locs.length !== order.length) {
                    for(var i = 0; i < order.length; i++) {
                        if(!locs.includes(order[i])){
                            temp2.push(order[i]);
                        }
                    }
                }
                temp2.map(item => {
                    temp1.push(item);
                });
                return temp1;
            })
            .then(res => { // If user is logged in, order devices further IF they aren't already prioritised correctly
                const resp = res;
                if(this.props.user.isLoggedIn) {
                    axios
                        .get('/api/users')
                        .then(res => {
                            const users = res.data;
                            users.filter(user => user.username === this.props.user.username)
                            .map(user => {
                                const userOrder = user.order;
                                const l = this.locations(orderObjects);
                                userOrder.filter(item => l.includes(item.location))
                                .map(item => {
                                    const find = orderObjects.find(data => data.motion === true && data.location === item.location);
                                    if(find) {
                                        const iMotion = resp.findIndex(i1 => i1 === item.location);
                                        const iOrder = userOrder.findIndex(i2 => i2.location === item.location);
                                        // if user index is lower than motion index, find index in resp then swap or move
                                        if(iOrder < iMotion) {
                                            let temp = resp.find(i3 => i3 === item.location);
                                            let tempOrder = userOrder.find(i2 => i2.location === item.location).location;
                                            let iO = resp.findIndex(i3 => i3 === item.location);
                                            resp[iMotion] = tempOrder;
                                            resp[iO] = temp;
                                        }
                                    }
                                });
                            });
                        })
                        .catch(err => {
                            throw err;
                        });
                    return resp;
                } else {
                    return res;
                }
            })
            .then(res => { // Set new order in state
                this.props.setOrder(res);
            })
            .catch(err => {
                throw err;
            });
    }
    getUser = () => {
        if(this.getCookie('user')) {
            const user = this.getCookie('user').input.split('=')[1];
            this.props.userIsLoggedIn(true, user);
            return user;
        }
    }
    getCookie = (input) => {
        return document.cookie.match(input);
    }
    locations = (devices) => {
        const set = new Set();
        devices.map(device => {
            set.add(device.location);
            return device;
        });
        return Array.from(set);
    }
    filter = (devices, location) => {
        const arr = [];
        devices.map(device => {
            if(device.location === location) {
                arr.push(device)
            }
            return device;
        })
        return arr;
    }
    render() {
        const { defaultView, order } = this.props.home;
        const { isLoggedIn } = this.props.user;
        return (
            <Fragment>
                <Header user={isLoggedIn} />
                <Main>
                {order.map(location => (
                    <Card key={location} className='card'>
                        <CardContent>
                            <Title>{location}</Title>
                            { this.filter(defaultView, location).map(function(device) {
                                return(
                                    <ListItem key={device.ref}>
                                        <Text>{device.name}</Text>
                                        {device.controls && device.name.toLowerCase().includes('lamp') || device.name.toLowerCase().includes('light') ? (
                                            <CardActions className='cardAction'>
                                                {device.hasRange ? (
                                                    <SimpleSlider
                                                        min={0}
                                                        max={device.range.RangeEnd}
                                                        status={device.status}
                                                        deviceref={device.ref}
                                                        value={device.value}
                                                        range={device.range}
                                                    />
                                                ) : (
                                                    <SwitchButton
                                                        color='primary'
                                                        value={device.value}
                                                        deviceref={device.ref}
                                                    />
                                                )}
                                            </CardActions>
                                        ) : (
                                            <Text>{device.status}</Text>
                                        )}
                                    </ListItem>
                                )
                            }) }
                        </CardContent>
                    </Card>
                ))}
                </Main>
            </Fragment>
        );
    }
}

Home.propTypes = {
    userIsLoggedIn: PropTypes.func.isRequired,
    updateHomeseer: PropTypes.func.isRequired,
    getUserOrder: PropTypes.func.isRequired,
    updateDefaultView: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    home: state.home,
    user: state.user
});

export default connect(mapStateToProps, { userIsLoggedIn, updateHomeseer, getUserOrder, setOrder, updateDefaultView })(Home);
