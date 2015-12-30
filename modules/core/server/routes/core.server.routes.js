'use strict';

const core = require('../controllers/core.server.controller');

module.exports = function(app) {
    app.route('/server-error').get(core.renderServerError);
    app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);
    app.route('/*').get(core.renderIndex);
};
