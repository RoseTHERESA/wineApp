var mongoose = require("mongoose");
var Wine = require("./wine");

var wineSchema = new mongoose.Schema({
	name: String,
	varietal: {
		//put dropdown menu 
		type: String,
		required: true
	},
	vintage: {
		type: Number
	},
	winery: String,
	vineyard: String,
	image: String,
	rating: Number,
	ownerId: String

});

var Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;