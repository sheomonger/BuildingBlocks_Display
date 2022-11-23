const mongoose = require('mongoose');

const mprobSchema = new mongoose.Schema({
	problem: String,
	choices: Array,
	answer: String,
	solution: String,
	info: String
});

const Mproblem = mongoose.model("mproblem", mprobSchema);  // compiling

module.exports = Mproblem;  // exporting to import