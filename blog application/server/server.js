const express=require("express");

const app=express();
const client=require('./conn.js');
const cors=require("cors");
app.use(express.json())
app.use(cors());
app.use('/uploads',express.static('uploads'));
const multer =require("multer");
// const upload =multer({dest:'uploads/'})//not giving extension therfore not loading
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
    cb(null,`${Date.now()}.${file.originalname}`)
    }

})
const upload=multer({storage:storage});

app.get('/blogs/:cat',(req,res)=>{
    
    const query=req.params.cat !='all' ?`Select * from blogs where category ='${req.params.cat}'`:'Select * from blogs';
    client.query(query,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json({"data":result.rows});
        }
    })
})
app.get('/blogsbyid/:id',(req,res)=>{
    const query=`Select * from blogs where id =${req.params.id}`;
    client.query(query,(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json({"data":result.rows});
        }
    })
})

app.post('/blogs',(req,res)=>{
    const obj=req.body;
    const query='INSERT INTO blogs (category,image,post,title) VALUES ($1,$2,$3,$4)'
    client.query(query,[obj.category,obj.image,obj.post,obj.title],(err,result)=>{
        if(err){
            res.send(err);
            console.log(err);
            console.log(obj.id)
        }
        else{
            // console.log(obj)
            res.json({"message":"Added new blog","desc":result.rowCount});
        }
    })

})

app.post('/blogimage',upload.single('file'),function(req,res,next){
    res.json(req.file);
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})