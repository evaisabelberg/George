# George
A home automation UI for HomeSeer
## Prerequisites
- Node.js
- MongoDB (running)
- HomeSeer 3 setup
- Motion detector connected to HomeSeer 3
- Kiwi browser for mobile clients
- Redux dev tools extension added in browser
- Download and extract George in desired location
## Install
### Run as Windows service
1. Follow the instructions of this link: https://tomasz.janczuk.org/2011/08/hosting-nodejs-applications-in-iis-on.html
### Run manually from command prompt
1. Inside George root folder, run 'npm install' and 'npm run client-install'
2. Locate the database in George root folder
3. Run npm start, which concurrently runs the server and client - consequently opening the application in a browser

**Note: The browser must have Redux Dev Tools installed to work with this application.**

## Results
### 1: Get devices from HomeSeer
#### Demo
![](gethomeseerdevices.gif)
#### Code
```
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
```
### 2: Setup George
#### Demo
![](setupgeorge.gif)

### 3: Login
#### Demo
![](loginmobile.gif)

### 4: Reorder locations
#### Demo
![](reorder.gif)
