const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");

const params = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "sandylance"
}

let conn = mysql.createConnection(params);

const multerApp = multer();

const app = express();

app.use(express.static('public'));

app.get("/cuenta/get/", function(req,res){
    let id = req.query.id;
    let sql = "SELECT * FROM cuenta WHERE idcuenta = ?";
    let params = [id];
    conn.query(sql,params, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/cuenta/get/lista", function(req,res){
    let sql = "SELECT * FROM cuenta";
    conn.query(sql, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});


app.get("/mascota/get/",function (req,res){
    let id = req.query.id;
    let sql = "SELECT * FROM mascota WHERE idmascota = ?";
    let params = [id];

    conn.query(sql,params,function(err,results){
        if(err) throw err;
        res.json(results);
    });
});

app.get("/mascota/get/lista", (req,res) =>{
    let sql = "SELECT * FROM mascota";
    conn.query(sql,function(err,result){
        if(err){
            res.json({err:"triste por el error" });

        }else{
            res.json(result);
        }

    });

});






app.post("/mascota/create", bodyParser.json(), (req, res) => {
    let nombre = req.body.nombre;
    let anho = req.body.anho;
    let historia = req.body.historia;
    let observaciones = req.body.observaciones;
    let sexo = req.body.sexo;
    let raza_especie_idraza = req.body.raza_especie_idraza;
    let raza_otros = req.body.raza_otros;
    let cuenta_idcuenta = req.body.cuenta_idcuenta;

    let sql = "insert into mascota SET ?";
    let params = {
        nombre: nombre,
        anho: anho,
        historia: historia,
        observaciones: observaciones,
        sexo: sexo,
        raza_especie_idraza: raza_especie_idraza,
        raza_otros: raza_otros,
        cuenta_idcuenta: cuenta_idcuenta,
    };

    conn.query(sql, params, (e) => {
        if (e) throw e;

        conn.query("select * from mascota", (err, resultado) => {
            if (err) throw err;
            res.json(resultado);
        });

    });

});


app.listen(3000, () => {
    console.log("servidor corriendo");
});