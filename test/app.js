var express = require("express");
var bodyParser = require("body-parser");
var url = bodyParser.urlencoded({ extended: false })
var app = express();
var fs = require("fs");

app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/new_file.html");
})



app.listen(80,()=>{
	
})