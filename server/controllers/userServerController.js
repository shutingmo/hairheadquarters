var express = require('express'),
    mongoose = require('mongoose'),
    User = require('../models/userServerModel'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');


exports.authenticateUser = function(req,res){
    User.findOne({username:req.body.username}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }
        if(!user){
            res.status(401).json({message: 'Authentication failed. User not found'});
        }
        else if(user && (req.body.password === user.password) && (req.body.username === user.username)) {
            // if(user.banned === true) {
            //     res.status(400).send({message: 'you have been banned'});
            // }
            // else if(user.verified === true) {
            //     currSessionUser = req.body.username;
            //     res.status(200).send({message: 'test'});
            // } else {
            //     console.log('Account not verified');
            //     res.status(412).send({message: 'Verify your account'})
            // }
            console.log("login success")
            res.status(200).send({message: 'login complete'});
        } 
        else {
            console.log('Username or password is incorrect');
            res.status(401).send({message: 'nope'});
        }
    })
};

exports.signupUser = function(req,res){
    console.log('backend sign up controller');
    // checkEmailExists()
    // function checkEmailExists(){
    //     User.findOne({email: req.body.email}, function(err, user) {
    //         if(err) {
    //             console.log(err);
    //             return res.status(400).send(err);
    //         }
    //         if(user) {
    //             console.log('email already taken');
    //             res.status(400).send('email ' + req.body.email + ' is already taken');
    //         } else {
    //             checkUsernameExists();
    //         }
    //     })
    // }

    // function checkUsernameExists(){
    //     User.findOne({username: req.body.username}, function(err, user) {
    //         if(err) {
    //             console.log(err);
    //             return res.status(400).send(err);
    //         }
    //         if(user) {
    //             console.log('username already taken');
    //             res.status(400).send('Username ' + req.body.username + ' is already taken');
    //         } else {
    //             matchPasswords();
    //         }
    //     })
    // }

    // function matchPasswords() {
    //     console.log(req.body.password)
    //     console.log(req.body.retypePassword)

    //     if(req.body.password === req.body.retypePassword) {
    //         createUser();
    //     } else {
    //         console.log('passwords don\'t match');
    //         res.status(400).send('passwords do not match');
    //     }
    // }
    createUser();
    function createUser() {
        // console.log('req.body is ' + req.body.data.JSON.stringify());
        var newUser = new User(req.body);
        // newUser.hash_password = bcrypt.hashSync(req.body.data.password, 10);

        newUser.save(function(err, user){
            if(err) {
                console.log(err)
                res.status(400).send(err)
            } else {
                console.log('added new user to database');
                // verifyUser();
                user.hash_password = undefined;
                res.json(newUser);
            }
        })
    }

};