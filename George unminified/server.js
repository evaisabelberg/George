const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rp = require('request-promise');
var cors = require('cors');

const users = require('./src/server/routes/api/users');
const homeseer = require('./src/server/routes/api/homeseer');
const defaultView = require('./src/server/routes/api/defaultView');

const app = express();
const key = require('./config/keys');
const port = key.port;

app.use(cors());
// Bodyparser middleware
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(express.static('./client/build'));

// Connect to mongodb
mongoose
    .connect(key.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/users', users);
app.use('/api/homeseer', homeseer);
app.use('/api/defaultView', defaultView);

app.listen(port, () => console.log(`Server started on ${port}`));
