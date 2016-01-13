'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const getGlobbedPaths = function(globPatterns, excludes) {
    const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            let files = glob.sync(globPatterns);

            if (excludes) {
                files = files.map(function(file) {
                    if (_.isArray(excludes)) {
                        for (let i in excludes) {
                            file = file.replace(excludes[i], '');
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }
    return output;
};
const validateEnvironmentVariable = function() {
    const fileName = './config/env/' + process.env.NODE_ENV + '.js';
    const environmentFiles = glob.sync(fileName);

    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
        } else {
            console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
        }
        process.env.NODE_ENV = 'development';
    }
};
const initGlobalConfigFolders = function(config, assets) {
    config.folders = {
        server: {},
        client: getGlobbedPaths(path.join(process.cwd(), 'modules/*/client/'), process.cwd().replace(new RegExp(/\\/g), '/'))
    };
}
const initGlobalConfigFiles = function(config, assets) {
    config.files = {
        server: {
            models: getGlobbedPaths(assets.server.models),
            routes: getGlobbedPaths(assets.server.routes),
            configs: getGlobbedPaths(assets.server.config)
        },
        client: {
            js: getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, 'public/')),
            css: getGlobbedPaths(assets.client.lib.css, 'public/').concat(getGlobbedPaths(assets.client.css, 'public/'))
        }
    };
};
const initGlobalConfig = function() {
    validateEnvironmentVariable();

    const configPath = path.join(process.cwd(), 'config/');
    const assets = require(path.join(configPath, 'assets/default'));
    const config = require(path.join(configPath, 'env/default'));

    _.merge(assets, require(path.join(configPath, 'assets/', process.env.NODE_ENV)));
    _.merge(config, require(path.join(configPath, 'env/', process.env.NODE_ENV)));
    initGlobalConfigFiles(config, assets);
    initGlobalConfigFolders(config, assets);
    config.utils = {
        getGlobbedPaths: getGlobbedPaths
    };

    return config;
};

module.exports = initGlobalConfig();
