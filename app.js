const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const Mproblem = require('./models/mproblem');  // Math Problem model
const btable = require('./btable');				// lookup table for blocks

mongoose.connect(config.db.connection);

//try {
//	console.log(btable.d2003.content);
//} catch (er) {
//	console.log(er);
//}


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
	res.render("landing");
})

app.get("/mathpros", (req, res) => {
	Mproblem.find()
	.exec()
	.then((foundMpros) => {
		res.render("mathpros", {mpros: foundMpros});
	})
	.catch((err) => {
		console.log(err);
		res.redirect("/mathpros");
	})
})

app.get("/blockpros", (req, res) => {
	Mproblem.find()
	.exec()
	.then((foundMpros) => {
		res.render("blockpros", {mpros: foundMpros, btable: btable});
	})
	.catch((err) => {
		console.log(err);
		res.redirect("/blockpros");
	})
})

app.post("/mathpros", (req, res) => {
	const newProb = {
		problem: req.body.problem,
		choices: [req.body.choice_1, req.body.choice_2, req.body.choice_3, req.body.choice_4, req.body.choice_5],
		answer: req.body.ans,
		solution: req.body.solution,
		info: req.body.info
	};
	
	Mproblem.create(newProb)
	.then((prob) => {
		// console.log(prob);
		res.redirect("/mathpros");
	})
	.catch((err) => {
		console.log(err);
		res.redirect("/mathpros");
	})
})

app.get("/mathpros/new", (req, res) => {
	res.render("mathpros_new");
})

// show route testing
app.get("/mathpros/new/:id", (req, res) => {
	res.send("Show page for test with ID of: " + req.params.id);
}) //

app.listen(3000, () => {
	console.log("lambdaalgo is running...");
});

