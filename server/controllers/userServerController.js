var express = require('express'),
    mongoose = require('mongoose'),
    User = require('../models/userServerModel'),
    Entry = require('../models/journalServerModel'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');
    nodemailer = require('nodemailer');

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
            currSessionUser = req.body.username;
            console.log("login success")
            console.log(JSON.stringify(currSessionUser))

            res.status(200).send({message: 'login complete'});
        } 
        else {
            console.log('Username or password is incorrect');
            res.status(401).send({message: 'nope'});
        }
    })
};
exports.sendPassLink = function(req, res) {
    var testAccount = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 567,
        // secure: false,
        // auth: {
        //     user: testAccount.user,
        //     pass: testAccount.pass
        // }
        service: 'gmail',
        auth:{
            user:'cynthia.mo.1812@gmail.com',
            pass:'s26367664'
        }
    });
    User.findOne({email: req.body.email}, function(err, user) {
        console.log(JSON.stringify(req.body.email));
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }
        if(!user) {
            console.log('no such user');
            return res.status(400).send('User does not exist');
        } else {
            // var mailOptions = {
            //     from: '"Admin" <admin@hairapp.com>', // sender address
            //     to: req.body.email, // receiver address
            //     subject: 'Change password link', // Subject line
            //     text: 'Change your password by clicking the following link, or by copying and pasting it into your browser: ${URL}', // plain text body
            //     html: '<p>Click <a href="${URL}">this link</a> to change your password. If you are unable to do so, copy and ' +
            //         'paste the following link into your browser:</p><p>${URL}</p>' // html body
            // };

            // // replace ${URL} with the password change URL
            // var r = /\$\{URL\}/g;
            // var URL = 'http://localhost:3000/account/forgot/' + user._id;
            // mailOptions.text = mailOptions.text.replace(r, URL);
            // mailOptions.html = mailOptions.html.replace(r, URL);

            // // send mail with defined transport object
            // transporter.sendMail(mailOptions, (err, info) => {
            //     if (err) {
            //         return console.log(err);
            //     }
            //     console.log('Password change email sent');
            // });
            var info = transporter.sendMail({
                from: 'momowhales@gmail.com', // sender address
                to: req.body.email, // receiver address
                subject: 'Hair Headquarters Login Information', // Subject line
                html: '<p>Hello, here is your login information.</p>' + '<p>Username: </p>' + user.username + '<p>Password: </p>' + user.password
            });

            var URL = "testing var ";
            console.log("message sent %s", info.messageId);
            console.log("preview url: %s", nodemailer.getTestMessageUrl(info));

            // var r = /\$\{URL\}/g;
            // var URL = 'http://localhost:3000/account/forgot/' + user._id;
            // info.text = info.text.replace(r, URL);
            // info.html = info.html.replace(r, URL);
        }
    })
};

// exports.updatePass = function(req, res) {
//     // grab the id from the URL
//     console.log('URL is ' + req.params.URL);
//     var id = req.params.URL;

//     // find a matching user using the id
//     User.findById(id).exec(function(err, user) {
//         if(err) {
//             console.log(err);
//             return res.status(400).send(err);
//         }
//         if(!user) {
//             console.log('user doesn\'t have an account');
//             return res.status(404).send('user not found');
//         }
//         currSessionUser = user.username;
//         return res.redirect('http://localhost:3000/js/html/user_profile.html');
//     })
// };

exports.getCurrentUser = function(req,res) {

    console.log('backend get curr user')
    console.log(JSON.stringify(currSessionUser))
    User.findOne( {username: currSessionUser}, {password: 0}, function(err, user){
        if (err){
            console.log(err);
            return res.status(400).send(err)
        }

        if(!user){
            console.log('user not found');
            return res.status(404).send('user not found')
        }

        console.log('current user found is ' + JSON.stringify(user.name));
        return res.status(200).send(user)
        }
    );

};

exports.signupUser = function(req,res){
    console.log('backend sign up controller');
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
                // user.hash_password = undefined;
                res.json(newUser);
            }
        })
    }

};

exports.submitJourEnt = function(req, res){
    var newEntry = new Entry(req.body);
    newEntry.username = currSessionUser;
    console.log(JSON.stringify(newEntry.username));
    newEntry.save(function(err){
        if(err) {
            console.log(err)
            res.status(400).send(err)
        } else {
            console.log('added new entry to database');
            // verifyUser();
            res.json(newEntry);
        }
    })
}