'use strict';

const users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/api/auth/forgot').put(users.forgot);
    app.route('/api/auth/signup').post(users.signup);
    app.route('/api/auth/reset/:token').get(users.validateResetToken);
    app.route('/api/auth/reset/:token').post(users.reset);
    app.route('/api/auth/signin').put(users.signin);
    app.route('/signout').get(users.signout);
};
