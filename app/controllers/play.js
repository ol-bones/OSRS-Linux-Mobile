'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');
const request = require('request');

const assign = Object.assign;

exports.play = function (req, res)
{
    res.render('play');
};

exports.requestNode = function(req, res)
{
    var headers =
    {
        "User-Agent": "WebFront",
        "Content-Type": "application/x-www-form-urlencoded"
    };

    var options =
    {
        url: "http://80.255.0.159:9000/spawnStreamer",
        method: "POST",
        headers: headers,
        form: {"Address": req.connection.remoteAddress.toString(), "User": "UrMum"}
    };

    request(options, function(err, nodeRes, body)
    {
        if(!err && nodeRes.statusCode === 200)
        {
            console.log(body);
            res.send(nodeRes);
        }
        else if(err || nodeRes.statusCode !== 200)
        {
            console.error(err || nodeRes.statusCode);
            res.status((err) ? 404 : nodeRes.statusCode).send("ERR");
        }
    });
};

exports.connect = function(req, res)
{
    res.json(req.g_ServerList.getSuitableNode());
};




