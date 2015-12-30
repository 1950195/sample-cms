'use strict';

const config = require('../config');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

module.exports.loadModels = function() {
    config.files.server.models.forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });
};

module.exports.connect = function(cb) {
    const db = mongoose.connect(config.db.uri, config.db.options, function(err) {
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(err);
        } else {
            mongoose.set('debug', config.db.debug);
            if (cb) cb(db);
        }
    });
};

module.exports.disconnect = function(cb) {
    mongoose.disconnect(function(err) {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        cb(err);
    });
};
