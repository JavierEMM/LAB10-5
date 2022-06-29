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

app.get("/cuenta/get/:idcuenta", function(req,res){
    let id = req.params.idcuenta;
    let sql = "SELECT * FROM cuenta WHERE idcuenta = ?";
    let params = [id];
    conn.query(sql,params, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/cuenta/get", function(req,res){
    let sql = "SELECT * FROM cuenta";
    conn.query(sql, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});


app.get("/mascota/get/:idmascota",function (req,res){
    let id = req.params.idmascota;
    let sql = "SELECT * FROM mascota WHERE idmascota = ?";
    let params = [id];

    conn.query(sql,params,function(err,results){
        if(err) throw err;
        res.json(results);
    });
});

app.get("/mascota/get", (req,res) =>{
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

    conn.query(sql, params, (e,result) => {
        if (e) throw e;
        let param = [result.insertId];
        conn.query("select * from mascota where idmascota = ?",param, (err, resultado) => {
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
        let idservicio = result.insertId;
        let params = [idservicio];
        console.log()
        conn.query("SELECT * FROM servicio WHERE idservicio = ?",params,function (err,results){
            if(err) throw err;
            res.json(results);
        })
    });
});


app.listen(3000, () => {
    console.log("servidor corriendo");
});