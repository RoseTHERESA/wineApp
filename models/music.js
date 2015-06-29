var mongoose = require("mongoose");

var musicSchema = new mongoose.Schema({
	category: String,
	wine: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Wine"
	}]

});

var Music = mongoose.model("Music", musicSchema);

module.exports = Music;