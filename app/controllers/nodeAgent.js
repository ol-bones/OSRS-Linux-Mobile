'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');

const assign = Object.assign;

exports.request= function (req, res){
  res.json({"addr": "80.255.0.159", "port": "3000"});
};






