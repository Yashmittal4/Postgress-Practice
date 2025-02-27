import React,{useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {uploadFile, createBlog} from "../api/Api"
function CreateBlog(){
    const [value,setValue]=useState("");
    
    const blankBlog={
        "title":"",
        "image":"",
        "post":"",
        "category":""
    }
    const [newblog,setNewblog]=useState(blankBlog);

    const handleUpload=async (event)=>{
        let uploadedFile=await uploadFile(event.target.files[0]);
        if(uploadedFile.path){
            setNewblog({...newblog,image:uploadedFile.path});
        }

    }
    
const handleSubmit=async()=>{
    let createdBlog=await createBlog(newblog);
    if(createdBlog.desc == 1){
        setNewblog(blankBlog);
        alert("blogg added succesfully");
    }
    else{
        alert("some error");
    }


}

    const menu=[
        {text:"Nature",path:"/"},
        {text:"Travel",path:"/"},
        {text:"Technology",path:"/"},
        {text:"Politics",path:"/"},
        
    ]
    return(
        <div className="flex w-full items-center justify-center">
        <div className="bg-slate-200 w-[60%] p-5 rounded-xl">
            <h1 className="text-2xl mb-5 "> Create Blog Post   </h1>
        <div clasName="flex flex-col ">
            {/* <small>{JSON.stringify(newblog)}</small> */}
<label htmlFor="" className="ml-1 text-gray-500">Title</label>
<input type="text" value={newblog.title} onChange={(e)=>setNewblog({...newblog,title:e.target.value})} className="h-10 border-gray-300 rounded my-2 p-2"/>
<label htmlFor="" className="ml-1 text-gray-500">Category</label>
<select  value={newblog.category} onChange={(e)=>setNewblog({...newblog,category:e.target.value})} name="" id="" className="h-10 border-gray-300 rounded my-2 p-2" >
   <option value="" default disabled >Select Category</option>
    {menu.map(x =>{
        return <option value={x.text}>{x.text}</option>

    })}
</select>
<label htmlFor="" className="ml-1 text-gray-500">Image</label>
<input type="file" onChange={(e)=> handleUpload(e)} className=" border-gray-300 rounded my-2 p-2"  />
<label htmlFor="" className="ml-1 text-gray-500">Post</label>
<ReactQuill className='bg-white rounded mb-2 mt-2 editingarea' theme="snow" value={newblog.post} onChange={(e)=>{setNewblog({...newblog,post:e})}} />
<hr />
<button onClick={()=> handleSubmit()} className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Submit</button>
        </div>
        
        </div>
        </div>
    )


}


export default CreateBlog;