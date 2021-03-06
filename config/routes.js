'use strict';

/*
 * Module dependencies.
 */

const index = require('../app/controllers/index');
const users = require('../app/controllers/users');
const play = require('../app/controllers/play');
const nodeAgent = require('../app/controllers/nodeAgent');
const admin = require('../app/controllers/admin');
const no_beta = require('../app/controllers/no_beta');

const auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

const fail =
{
    failureRedirect: '/login'
};

/**
 * Expose routes
 */

module.exports = function (app, passport, g_ServerList)
{
    const pauth = passport.authenticate.bind(passport);

    app.use(function(req, res, next)
    {
        //console.log(g_ServerList);
        var allowedOrigins = ['http://sarian.world:80', 'http://sarian.world:5000', 'http://sarian.world:7990'];

        var origin = req.headers.origin;
        if(allowedOrigins.indexOf(origin) > -1)
        {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', true);

        req = g_ServerList;
        next();
    });

    // play routes
    app.get('/', index.index);
    app.get('/no_beta_access', auth.requiresLogin, no_beta.no);
    console.log("route no beta");
    app.get('/play', auth.requiresLogin, play.play);
    app.get('/requestNode', auth.requiresLogin, play.requestNode);

    // user routes
    app.get('/login', users.login);
    app.get('/signup', users.signup);
    app.get('/logout', users.logout);

    app.post('/users', users.create);
    app.post('/users/session',
    pauth('local',
    {
        failureRedirect: '/login',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/:userId', users.show);
    app.param('userId', users.load);

    app.get('/admin', auth.requiresLogin, admin.main);
    app.post('/admin/updateuser', auth.requiresLogin, admin.updateuser);




    /**
    * Error handling
    */

    app.use(function (err, req, res, next)
    {
        // treat as 404
        if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed'))))
        {
            return next();
        }

        console.error(err.stack);

        if (err.stack.includes('ValidationError'))
        {
            res.status(422).render('422', { error: err.stack });
            return;
        }

        // error page
        res.status(500).render('500', { error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res)
    {
        const payload =
        {
            url: req.originalUrl,
            error: 'Not found'
        };
        if (req.accepts('json')) return res.status(404).json(payload);
        res.status(404).render('404', payload);
    });
};
