const {Client} =require("pg");

const con =new Client({
    host:"localhost",
    user:"postgres",
    port :5432,
    password:"ankur@yash@0300@YASH",
    database:"Demoport"
})



con.connect().then(()=>console.log("connected"));