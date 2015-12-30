'use strict';

const config = require('../config');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const favicon = require('serve-favicon');
const compress = require('compression');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const flash = require('connect-flash');
const consolidate = require('consolidate');
const path = require('path');

module.exports.initLocalVariables = function(app) {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;

    if (config.secure && config.secure.ssl === true) {
        app.locals.secure = config.secure.ssl;
    }

    app.locals.keywords = config.app.keywords;
    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;
    app.locals.livereload = config.livereload;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;

    app.use(function(req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
};

module.exports.initMiddleware = function(app) {
    app.set('showStackError', true);
    app.enable('jsonp callback');

    app.use(compress({
        filter: function(req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.use(favicon(config.favicon));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        app.set('view cache', false);
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(flash());
};

module.exports.initViewEngine = function(app) {
    app.engine('server.view.html', consolidate[config.templateEngine]);
    app.set('view engine', 'server.view.html');
    app.set('views', './');
};

module.exports.initSession = function(app, db) {
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionCookie.maxAge,
            httpOnly: config.sessionCookie.httpOnly,
            secure: config.sessionCookie.secure && config.secure.ssl
        },
        key: config.sessionKey,
        store: new MongoStore({
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        })
    }));
};

module.exports.initModulesConfiguration = function(app, db) {
    config.files.server.configs.forEach(function(configPath) {
        require(path.resolve(configPath))(app, db);
    });
};

module.exports.initHelmetHeaders = function(app) {
    const SIX_MONTHS = 15778476000;
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
};

module.exports.initModulesClientRoutes = function(app) {
    app.use('/', express.static(path.resolve('./public')));
    config.folders.client.forEach(function(staticPath) {
        app.use(staticPath, express.static(path.resolve('./' + staticPath)));
    });
};

module.exports.initModulesServerRoutes = function(app) {
    config.files.server.routes.forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });
};

module.exports.initErrorRoutes = function(app) {
    app.use(function(err, req, res, next) {
        if (!err) {
            return next();
        }

        console.error(err.stack);
        res.redirect('/server-error');
    });
};

module.exports.configureSocketIO = function(app, db) {
    return require('./socket.io')(app, db);
};

module.exports.init = function(db) {
    let app = express();
    this.initLocalVariables(app);
    this.initMiddleware(app);
    this.initViewEngine(app);
    this.initSession(app, db);
    this.initModulesConfiguration(app);
    this.initHelmetHeaders(app);
    this.initModulesClientRoutes(app);
    this.initModulesServerRoutes(app);
    this.initErrorRoutes(app);
    app = this.configureSocketIO(app, db);
    return app;
};
