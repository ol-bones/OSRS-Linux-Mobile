'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');
const ServerList = require('../utils/serverlist');
const assign = Object.assign;

exports.play = function (req, res)
{
    res.render('play');
};

exports.connect = function(req, res)
{
    res.json(req.g_ServerList);
};




