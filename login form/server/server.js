

const {Client} =require("pg");
const express=require("express");

const app=express();
app.use(express.json());



const con =new Client({
    host:"localhost",
    user:"postgres",
    port :5432,
    password:"ankur@yash@0300@YASH",
    database:"Demoport"
})



con.connect().then(()=>console.log("connected"));


app.post('/postData',(req,res)=>{
    const {name,id} =req.body;

    const insert_query='INSERT INTO demotable (name,id) VALUES ($1,$2)';
    con.query(insert_query,[name,id],(err,result)=>{
   
        if(err){
            res.send(err);
        }else{
            console.log(result);
            res.send("Posted data");
        }
    })
})


app.get("/fetchData",(req,res)=>{
    const fetch_query="SELECT * from demotable";
    con.query(fetch_query,(err,result)=>{
        if(err){
            res.send(err);
        }else{
            console.log(result.rows);
            res.send(result.rows);
        }
    })
})

app.get('/fetchbyId/:id',(req,res)=>{
    const id =req.params.id;
    const fetch_query="select * from demotable where id =$1";
    con.query(fetch_query,[id],(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            console.log(result.rows);
            res.send(result.rows);
        }
    })
})


app.put('/update/:id',(req,res)=>{
    const id =req.params.id;
    const name =req.body.name;
    const update_query="UPDATE demotable SET name=$1 WHERE id =$2"
    con.query(update_query,[name,id],(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.delete("/delete/:id",(req,res)=>{
    const id =req.params.id;
    const query ="DELETE from demotable where id =$1";
    con.query(query,[id],(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.listen(3000,()=>{
    console.log("service runing...");
})