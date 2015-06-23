var mongoose = require("mongoose");
var Wine = require("./wine");

var wineSchema = new mongoose.Schema({
	name: String,
	varietal: {
		type: String,
		required: true
	},
	vintage: {
		type: Number,
		required: true
	},
	winery: String,
	image: String
});

var Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;