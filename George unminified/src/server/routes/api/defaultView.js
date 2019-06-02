const express = require('express');
const router = express.Router();

const DefaultViewModel = require('../../models/DefaultViewModel');

router.get('/', (req, res) => {
    DefaultViewModel.find()
        .then(defaultView => res.json(defaultView))
});
router.post('/', (req, res) => {
    const newDefaultView = new DefaultViewModel({
        devices: req.body.devices
    });
    newDefaultView.save().then(defaultView => res.json(defaultView));
});
router.put('/', (req, res) => {
    DefaultViewModel.update({}, {devices: req.body.devices}).then(home => res.json(home));
});
module.exports = router;
