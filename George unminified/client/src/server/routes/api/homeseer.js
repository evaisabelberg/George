const express = require('express');
const router = express.Router();

const HomeseerModel = require('../../models/HomeseerModel');

router.get('/', (req, res) => {
    HomeseerModel.find()
        .then(homeseer => res.json(homeseer))
});
router.post('/', (req, res) => {
    const newHomeseer = new HomeseerModel({
        devices: req.body.devices
    });

    newHomeseer.save().then(homeseer => res.json(homeseer));
});
router.put('/', (req, res) => {
    HomeseerModel.update({}, {devices: req.body.homeseer}).then(homeseer => res.json(homeseer));
});
module.exports = router;
