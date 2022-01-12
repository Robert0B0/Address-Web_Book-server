const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(
	{origin: 'https://web-contacts-app.herokuapp.com'}
));
app.listen(port, () => {
	console.log("Server started on port", port);
});

//Create connection
const db = mysql.createConnection({
	host: "eu-cdbr-west-02.cleardb.net",
	user: "b0ca1ad9ee319f",
	password: "2a21be57",
	database: "heroku_10bf9d7c5ff0dcf",
});

// Connect
db.connect((err) => {
	if (err) {
		console.log(err);
		throw err;
	} else {
		console.log("DB Connected...");
	}
});

//GET
app.get("/contacts", (req, res) => {
	db.query("SELECT * FROM my_contacts", (err, result) => {
		if (err) {
			throw err;
		} else {
			res.send(result);
		}
	});
});

//POST
app.post("/create", (req, res) => {
	const name = req.body.name;
	const address = req.body.address;
	const picture = req.body.picture;

	db.query(
		"INSERT INTO my_contacts (name, address, picture) VALUES (?,?,?);",
		[name, address, picture],
		(err, result) => {
			if (err) {
				throw err;
			} else {
				res.send("Values Inserted");
			}
		}
	);
});

//UPDATE
app.put("/contact/:id", (req, res) => {
	const name = req.body.name;
	const address = req.body.address;
	const picture = req.body.picture;
	const contact_id = parseInt(req.params.id);

	db.query(
		"UPDATE my_contacts SET name = ?, address = ?, picture = ? WHERE id = ?;",
		[name, address, picture, contact_id],
		(err, result) => {
			if (err) {
				throw err;
			} else {
				res.send("Values Inserted");
			}
		}
	);
});

//DELETE
app.delete("/delete/:id", (req, res) => {
	const contact_id = parseInt(req.params.id);

	db.query(
		"DELETE FROM my_contacts WHERE id = ?;",
		[contact_id],
		(err, result) => {
			if (err) {
				console.log(err);
				throw err;
			} else {
				res.send("Values Deleted");
			}
		}
	);
});
