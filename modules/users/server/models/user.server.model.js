'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const validator = require('validator');
const generatePassword = require('generate-password');
const owasp = require('owasp-password-strength-test');
const validateLocalStrategyProperty = function(property) {
    return !this.updated || property.length;
};
const validateLocalStrategyEmail = function(email) {
    return !this.updated || validator.isEmail(email);
};

let UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

UserSchema.pre('validate', function(next) {
    if (this.provider === 'local' && this.password && this.isModified('password')) {
        const result = owasp.test(this.password);
        if (result.errors.length) {
            const error = result.errors.join(' ');
            this.invalidate('password', error);
        }
    }

    next();
});

UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    let _this = this,
        possibleUsername = username.toLowerCase() + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.statics.generateRandomPassphrase = function() {
    return new Promise(function(resolve, reject) {
        let password = '',
            repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');

        while (password.length < 20 || repeatingCharacters.test(password)) {
            password = generatePassword.generate({
                length: Math.floor(Math.random() * (20)) + 20,
                numbers: true,
                symbols: false,
                uppercase: true,
                excludeSimilarCharacters: true,
            });

            password = password.replace(repeatingCharacters, '');
        }

        if (owasp.test(password).errors.length) {
            reject(new Error('An unexpected problem occured while generating the ' + 'random passphrase'));
        } else {
            resolve(password);
        }
    });
};

mongoose.model('User', UserSchema);
