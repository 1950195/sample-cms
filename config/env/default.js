'use strict';

module.exports = {
    app: {
        title: 'Sample CMS',
        description: 'CMS by nodejs',
        keywords: 'MongoDB, Express, Node.js'
    },
    port: process.env.PORT || 8000,
    templateEngine: 'swig',
    sessionCookie: {
        maxAge: 24 * (60 * 60 * 1000),
        httpOnly: true,
        secure: false
    },
    sessionSecret: 'MEAN',
    sessionKey: 'sessionId',
    sessionCollection: 'sessions',
    staticPath: './public',
    logo: 'images/logo.png',
    favicon: 'images/favicon.ico'
};
