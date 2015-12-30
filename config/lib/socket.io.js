'use strict';

const config = require('../config');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = function(app, db) {
    const server = http.createServer(app);
    const io = socketio.listen(server);
    const mongoStore = new MongoStore({
        mongooseConnection: db.connection,
        collection: config.sessionCollection
    });

    io.use(function(socket, next) {
        cookieParser(config.sessionSecret)(socket.request, {}, function(err) {
            const sessionId = socket.request.signedCookies ? socket.request.signedCookies[config.sessionKey] : undefined;

            if (!sessionId) {
                return next(new Error('sessionId was not found in socket.request'),
                            false);
            }

            mongoStore.get(sessionId, function(err, session) {
                if (err) return next(err, false);
                if (!session) {
                    return next(new Error('session was not found for ' + sessionId), false);
                }
                socket.request.session = session;
            });
        });
    });

    io.on('connection', function(socket) {
        config.files.server.sockets.forEach(function(socketConfiguration) {
            require(path.resolve(socketConfiguration))(io, socket);
        });
    });

    return server;
};
