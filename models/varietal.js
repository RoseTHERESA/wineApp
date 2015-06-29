var mongoose = require("mongoose");

var varietalSchema = new mongoose.Schema({
	name: String,
	notes: [String]
});

var Varietal = mongoose.model("Varietal", varietalSchema);

module.exports = Varietal;