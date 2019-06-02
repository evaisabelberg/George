import axios from 'axios';
import keys from '../server/config/keys.js';
import { GET_HOMESEER, SET_ORDER, HOME_LOADING, GET_DEFAULT_VIEW, USER_IS_LOGGED_IN, SET_VIEW, SET_USER_ORDER } from './types';

export const getHomeseerData = () => dispatch => {
    axios
        .get(keys.hsURI + keys.getStatus) // HomeSeer URI + HomeSeer API
        .then(res => {
            axios
                .post('/api/homeseer', {
                    devices: res.data.Devices
                })
                .then(res => {
                    dispatch(setHomeLoading()); // Displays loading animation
                    dispatch(getHomeseer()); // Sets HomeSeer devices in state
                })
                .then(() => {
                    dispatch(setView(2)); // Determines which component to render in the view
                })
                .catch(err => {
                    throw err;
                })
        })
        .catch(err => {
            throw err;
        });
}
export const getHomeseer = () => dispatch => {
    dispatch(setHomeLoading());
    axios
        .get('/api/homeseer')
        .then(res => {
            dispatch({
                type: GET_HOMESEER,
                payload: res.data[0].devices
            });
        })
        .catch(err => {
            throw err;
        })
};
export const getDefaultView = () => dispatch => {
    dispatch(setHomeLoading());
    axios
        .get('/api/defaultView')
        .then(res => {
            if(res.data.length > 0) {
                dispatch({
                    type: GET_DEFAULT_VIEW,
                    payload: res.data[0].devices
                });
            }
        })
        .then(() => {
            dispatch(setView(3));
        })
        .catch(err => {
            throw err;
        })
};
export const setDefaultView = (devices) => dispatch => {
    dispatch(setHomeLoading());
    axios
        .post('/api/defaultView', {
            devices: devices
        })
        .then(res => {
            dispatch(getDefaultView());
            return res.data.devices;
        })
        .then(res => {
            const set = new Set();
            res.map(device => {
                set.add(device.location);
            });
            return Array.from(set);
        })
        .then(res => {
            dispatch(setView(3));
            return res;
        })
        .then(res => {
            dispatch(setOrder(res));
        })
        .catch(err => {
            throw err;
        });
}
export const updateDefaultView = (devices) => dispatch => {
    axios
        .put('/api/defaultView', {
            devices: devices
        })
        .then(res => {
            dispatch(getDefaultView());
        })
        .catch(err => {
            throw err;
        });
}
export const updateHomeseer = () => dispatch => {
    axios
        .get(keys.hsURI + keys.getStatus)
        .then(res => {
            axios
                .put('/api/homeseer', {
                    devices: res.data.Devices
                })
                .then(res => {
                    dispatch(getHomeseer());
                })
                .then(() => {
                    dispatch(getDefaultView());
                })
                .catch(err => {
                    throw err;
                });
        })
        .catch(err => {
            throw err;
        })
};
export const setView = (id) => dispatch => {
    dispatch(setHomeLoading());
    dispatch({
        type: SET_VIEW,
        payload: id
    });
}
export const setHomeLoading = () => {
    return {
        type: HOME_LOADING
    }
};
export const setOrder = (data) => dispatch => {
    dispatch({
        type: SET_ORDER,
        payload: data
    });
}
export const userIsLoggedIn = (isLoggedIn, username) => dispatch => {
    dispatch({
        type: USER_IS_LOGGED_IN,
        isLoggedIn,
        username
    });
};
export const setUserOrder = (user, data) => dispatch => {
    const array = [];
    axios
        .put('/api/users/' + user, {
            order: data
        })
        .then(res => {
            data.map(item => {
                array.push(item.location);
            });
        })
        .then(() => {
            dispatch(setOrder(array));
        })
        .catch(err => {
            throw err;
        });
}
export const getUserOrder = (user) => dispatch => {
    axios
        .get('/api/users/' + user)
        .then(res => {
            const set = new Set();
            res.data[0].order.map(device => {
                set.add(device.location);
                return device;
            });
            return Array.from(set);
        })
        .then(res => {
            dispatch(setOrder(res));
        })
        .catch(err => {
            throw err;
        })
}
export const controlHomeseerByValue = (deviceref, value) => dispatch => {
    dispatch(setHomeLoading());
    axios
        .post(keys.hsURI, JSON.stringify({
            'action': 'controlbyvalue',
            'deviceref': deviceref,
            'value': value
        }))
        .then(res => {
            dispatch(updateHomeseer());
        })
        .catch(err => { throw err; });
}
export const controlHomeseerByLabel = (deviceref, label) => dispatch => {
    dispatch(setHomeLoading());
    axios
        .post(keys.hsURI, JSON.stringify({
            'action': 'controlbylabel',
            'deviceref': deviceref,
            'label': label
        }))
        .then(res => {
            dispatch(updateHomeseer());
        })
        .catch(err => { throw err; });
}
