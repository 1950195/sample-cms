'use strict';

const config = require('../config');
const mongoose = require('./mongoose');
const express = require('./express');
const chalk = require('chalk');

mongoose.loadModels();

module.exports = {
    loadModels: function() {
        mongoose.loadModels();
    },
    init: function(callback) {
        mongoose.connect(function(db) {
            const app = express.init(db);
            if (callback) {
                callback(app, db, config);
            }
        });
    },
    start: function(callback) {
        this.init(function(app, db, config) {
            app.listen(config.port, function() {
                console.log('--');
                console.log(chalk.green(config.app.title));
                console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
                console.log(chalk.green('Port:\t\t\t\t' + config.port));
                console.log(chalk.green('Database:\t\t\t' + config.db.uri));

                if (process.env.NODE_ENV === 'secure') {
                    console.log(chalk.green('HTTPs:\t\t\t\ton'));
                }
                console.log('--');

                if (callback) callback(app, db, config);
            });
        });
    }
};
