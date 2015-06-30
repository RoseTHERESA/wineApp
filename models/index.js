var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/winebeats_app");

mongoose.set("debug",true)

module.exports.Wine = require("./wine");
module.exports.User = require("./user");
module.exports.Varietal = require("./varietal");
module.exports.closeConnection = function() {
	mongoose.connection.close();
};

