var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/winebeats_app");

module.exports.Wine = require("./wine");

