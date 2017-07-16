'use strict';

const mongoose = require("mongoose");
const {wrap: async } = require("co");
const {respond} = require("../utils");
const User = mongoose.model("User");

exports.main = (req, res) =>
{
    User.find({}, (err, users) =>
    {
        users.forEach((user) =>
        {
            console.log(user);
        });
        res.render("layouts/admin",
        {
            users: users
        });
    });
};
