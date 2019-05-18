# George
A home automation UI for HomeSeer
## Prerequisites
- Node.js
- MongoDB
- HomeSeer 3
- Motion detector connected to HomeSeer 3
- Download and extract George in desired location
## Install
### Run as Windows service
1. Follow the instructions of this link: https://tomasz.janczuk.org/2011/08/hosting-nodejs-applications-in-iis-on.html
### Run from command prompt
1. Inside George root folder, run 'npm install' and 'npm run client-install'
2. Locate the database in George root folder
3. Run npm start, which concurrently runs the server and client - consequently opening the application in a browser

**Note: The browser must have Redux Dev Tools installed to work with this application.**

## Home
Example of home view

![](homeexample.PNG)

Example of setup view

![](setup.gif)
