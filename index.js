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


app.get("/mascota/get/",function (req,res){
    let id = req.query.id;
    let sql = "SELECT * FROM mascota WHERE idmascota = ?";
    let params = [id];

    conn.query(sql,params,function(err,results){
        if(err) throw err;
        res.json(results);
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
    let a = 2;
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

app.post('/servicio/create/:idmascota',bodyParser.json(),function (req,res){

    let idmascota = req.params.idmascota;
    let cuentaIdcuenta = req.body.cuenta_idcuenta;
    let hora = req.body.hora_inicio;
    let duracion = req.body.duracion;
    let entrega = req.body.entrega;
    let responsable = req.body.responsable_idresponsable;

    let parametros = [idmascota,cuentaIdcuenta,hora,duracion,entrega,responsable]
    let sql="INSERT INTO servicio (mascota_idmascota,cuenta_idcuenta,hora_inicio,duracion,entrega,responsable_idresponsable) VALUES (?,?,?,?,?,?)";
    conn.query(sql,parametros,function (err,result){
        if(err) throw err;
        let idservicio = result.idservicio;
        let params = [idservicio];
        conn.query("SELECT * FROM servicio WHERE idservicio = ?",params,function (err,results){
            if(err) throw err;
            res.json(results);
        })
    });
});


app.listen(3000, () => {
    console.log("servidor corriendo");
});