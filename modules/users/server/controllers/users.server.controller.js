'use strict';

const path = require('path');
const config = require(path.resolve('./config/config'));
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
const mongoose = require('mongoose');
const User = mongoose.model('User');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport(config.mailer.options);

exports.signup = function(req, res) {
    let user = new User(req.body);

    user.displayName = user.firstName + ' ' + user.lastName;

    user.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.session.user = user;
            user.password = undefined;
            user.salt = undefined;
            res.json(user);
        };
    });
};

exports.signin = function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username: username.toLowerCase()
    }, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        if (!user || !user.authenticate(password)) {
            return res.status(400).send({
                message: 'Invalid username or password'
            });
        }

        req.session.user = user;
        user.password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.signout = function(req, res) {
    req.session.user = null;
    res.redirect('/');
};

exports.userByID = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'User is invalid'
        });
    }

    User.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return next(new Error('Failed to load User ' + id));
        }

        req.profile = user;
        next();
    });
};

exports.forgot = function(req, res) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buffer) {
                done(err, buffer.toString('hex'));
            });
        },
        function(token, done) {
            if (req.body.username) {
                User.findOne({
                    username: req.body.username.toLowerCase()
                }, '-salt -password', function(err, user) {
                    if (!user) {
                        return res.status(400).send({
                            message: 'No account with that username has been found'
                        });
                    } else {
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function(err) {
                            done(err, token, user);
                        });
                    }
                });
            } else {
                return res.status(400).send({
                    message: 'Username field must not be blank'
                });
            }
        },
        function(token, user, done) {
            res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
                name: user.displayName,
                appName: config.app.title,
                url: 'http://' + req.headers.host + '/api/auth/reset/' + token
            }, function(err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        function(emailHTML, user, done) {
            smtpTransport.sendMail({
                to: user.email,
                from: config.mailer.from,
                subject: 'Password Reset',
                html: emailHTML
            }, function(err, info) {
                if (!err) {
                    res.send({
                        message: 'An email has been sent to the provided email with further instructions.'
                    });
                } else {
                    return res.status(400).send({
                        message: 'Failure sending email'
                    });
                }

                done(err);
            });
        }
    ], function(err) {
        if (err) {
            return next(err);
        }
    });
};

exports.validateResetToken = function(req, res) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function(err, user) {
        if (!user) {
            return res.redirect('/password/reset/invalid');
        }

        res.redirect('/password/reset/' + req.params.token);
    });
};

exports.reset = function(req, res, next) {
    const passwordDetails = req.body;

    async.waterfall([
        function(done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function(err, user) {
                if (!err && user) {
                    if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                        user.password = passwordDetails.newPassword;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function(err) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                user.password = undefined;
                                user.salt = undefined;
                                res.json(user);
                                done(err, user);
                            }
                        });
                    } else {
                        return res.status(400).send({
                            message: 'Passwords do not match'
                        });
                    }
                } else {
                    return res.status(400).send({
                        message: 'Password reset token is invalid or has expired.'
                    });
                }
            });
        },
        function(user, done) {
            res.render('modules/users/server/templates/reset-password-confirm-email', {
                name: user.displayName,
                appName: config.app.title
            }, function(err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        function(emailHTML, user, done) {
            smtpTransport.sendMail({
                to: user.email,
                from: config.mailer.from,
                subject: 'Your password has been changed',
                html: emailHTML
            }, function(err) {
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) {
            return next(err);
        }
    });
};
