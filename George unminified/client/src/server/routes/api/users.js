const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = require('../../models/UserModel');

router.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
});
router.get('/:username', (req, res) => {
    UserModel.find({'username': req.params.username}, function(err, user) {
        if(err) {
            throw err;
        }
        return res.json(user);
    })
    .catch(err => {
        throw err;
    })
});
router.post('/:username', (req, res) => {
    UserModel.find({'username': req.params.username}, function(err, user) {
        if(user.length > 0){
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if(err) {
                    throw err;
                }
                else {
                    return res.json(result);
                }
            });
        }
        else {
            return res.json(false);
        }
    })
    .catch(err => {
        throw err;
    });
});
router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new UserModel({
            username: req.body.username,
            password: hash,
            order: req.body.order
        });
        newUser.save().then(user => res.json(user));
    });
});
router.put('/:username', (req, res) => {
    UserModel.find({'username': req.params.username}, function(err, user) {
        if(user.length > 0) {
            UserModel.update({'username': req.params.username}, {order: req.body.order}).then(user => res.json(user));
        } else {
            return null;
        }
    })
});
module.exports = router;
