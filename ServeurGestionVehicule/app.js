const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;
//Enablling CORS for all requests
app.use(cors());
//Using bodyParser to parse jSON bodies into JS objects
app.use(bodyParser.json());

app.get("/", function(request, response){
	response.send("Bonjour tout le monde.<br/><br/><br/>Utilisation du serveur Express.")
});
app.listen(port);

app.get("/getAllVehicules", function(request, response){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root123",
		database: "gestionVehicule"
	});
	
	con.connect(function(err){
		if (err) throw err;
		con.query("SELECT * FROM Vehicule", function(err, result, fields){
			if (err) throw err;
			console.log(JSON.stringify(result));
			response.status(200).json(result);
            con.end();
		});
	});
});

app.get("/getVehicule/:id", function(request, response){
	const id = request.params.id;
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root123",
		database: "gestionVehicule"
	});
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT * FROM Vehicule where id = ?", [id], function (err, result, fields) {
			if (err) throw err;
			if(result.length > 0) {
				console.log(JSON.stringify(result[0]));
				response.status(200).json({
					message : "Véhicule(s) trouvé(s)",
					data : result[0]
				});
			}
			else{
				console.log("Véhicule non trouvé");
				response.status(200).json({
					message : "Aucun Véhicule trouvé",
					data : {}
				});
			}
            con.end();
		});
	});
});

app.post("/createVehicule", function(request, response){
	const vehicule = request.body;
	console.log(vehicule.id + " " + vehicule.marque + " " + vehicule.modele + " " + vehicule.annee
                + " " + vehicule.couleur + " " + vehicule.image);
	console.log(JSON.stringify(vehicule)); 
	
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root123",
		database: "gestionVehicule"
	});

    con.connect(function(err) {
        if (err) throw err;
        
        // Vérification de l'existence de l'ID
        con.query("SELECT * FROM Vehicule WHERE Id = ?", [vehicule.id], function(err, rows) {
            if (err) throw err;

            if (rows.length > 0) {
                // L'ID existe déjà, donc on envoie un message d'erreur
                response.status(400).send("La création du véhicule a échoué car un autre véhicule existant a le même ID.");
                con.end();
            } else {
                con.query("INSERT INTO Vehicule VALUES (?, ?, ?, ?, ?, ?)",
                [vehicule.id, vehicule.marque, vehicule.modele, vehicule.annee, vehicule.couleur, vehicule.image], 
                function(err, result, fields) { 
                    if (err) throw err;
                    response.status(200).send("Véhicule ajouté");
                    con.end();
                });
            }
        }); 
	});
});

app.put("/updateVehicule/:id", function(request, response){
	const id = request.params.id;
	const vehicule = request.body;
	console.log(vehicule.id + " " + vehicule.marque + " " + vehicule.modele + " " + vehicule.annee
    + " " + vehicule.couleur + " " + vehicule.image);
	console.log(JSON.stringify(vehicule)); 
	
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root123",
		database: "gestionVehicule"
	});
	
    con.connect(function(err) {
        if (err) throw err;

        const updateQuery = "UPDATE Vehicule SET marque = ?, modele = ?, annee = ?, couleur = ?, image = ? WHERE id = ?";
        const updateValues = [vehicule.marque, vehicule.modele, vehicule.annee, vehicule.couleur, vehicule.image, id];

        con.query(updateQuery, updateValues, function (err, result, fields) {
            if (err) throw err;

            if (result.affectedRows > 0) {
                response.status(200).send("Véhicule modifié");
            } else {
                response.status(404).send("Aucun véhicule trouvé avec l'ID spécifié");
            }

            con.end();
        });
    });
});

app.delete("/deleteVehicule/:id", function(request, response){
	const id = request.params.id;
	
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root123",
		database: "gestionVehicule"
	});
	
	con.connect(function(err) {
		if (err) throw err;
		con.query("DELETE FROM Vehicule where id = ?", [id], function (err, result, fields) {
			if (err) throw err;
			response.status(200).send("Véhicule supprimé");
            con.end();
		});
	});
});
