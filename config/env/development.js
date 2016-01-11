'use strict';

const defaultEnvConfig = require('./default');

module.exports = {
    db: {
        uri: process.env.MONGOHQ_URL
            || process.env.MONGOLAB_URI
            || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/cms',
                options: {
                    user: '',
                    pass: ''
                },
                debug: process.env.MONGODB_DEBUG || false
    },
    log: {
        format: 'dev'
    },
    app: {
        title: defaultEnvConfig.app.title + ' - Development Environment'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'Admin<dxn131420@163.com>',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || '163',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'dxn131420@163.com',
                pass: process.env.MAILER_PASSWORD || 'igyfauguzfeqncnt'
            }
        }
    },
    livereload: true,
    livereloadPort: 35729,
    seedDB: process.env.MONGO_SEED || false
};
