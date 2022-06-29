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