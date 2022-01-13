const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

//ROUTES
//GET
app.get("/contacts", async (req, res) => {
	try {
		const allContcats = await pool.query("SELECT * FROM contacts");
		res.json(allContcats.rows);
	} catch (err) {
		console.log(err.message);
	}
});

//POST
app.post("/create", async (req, res) => {
	const name = req.body.name;
	const address = req.body.address;
	const picture = req.body.picture;

	try {
		const newContact = await pool.query(
			"INSERT INTO contacts (name, address, picture) VALUES ($1,$2,$3);",
			[name, address, picture]
		);
		res.json(newContact.rows[0]);
	} catch (err) {
		console.log(err.message);
	}
});

//UPDATE
app.put("/contact/:id", async (req, res) => {
	const name = req.body.name;
	const address = req.body.address;
	const picture = req.body.picture;
	const { id } = req.params;

	try {
		const updateContact = await pool.query(
			"UPDATE contacts SET = name = $1, address = $2, picture = $3 WHERE id = $4;",
			[name, address, picture, id]
		);

		res.json("contact Updates");
	} catch (err) {
		console.log(err.message);
	}
});

//DELETE
app.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleteObj = await pool.query("DELETE FROM contacts WHERE id = $1", [
			id,
		]);
		res.json("Contact deleted");
	} catch (err) {
		console.log(err.message);
	}
});

//Run Server
app.listen(port, () => {
	console.log("Server started on port", port);
});
