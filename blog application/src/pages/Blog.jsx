import React ,{useState,useEffect}from 'react'
import {getblogbyid} from "../api/Api";
import {useParams} from "react-router-dom"
import parse from 'html-react-parser'
import dateFormat from 'dateFormat'

function Blog() {
  let {id}=useParams();
  
  const [blog,setBlog]=useState(null);
  const apiURL="http://localhost:3000/"

    useEffect(()=>{
        async function fetchData(){

            const allBlogs=await getblogbyid(id);
            console.log(allBlogs.data[0]);
            setBlog(allBlogs.data[0]);
        }
        fetchData();
    },[])


  return (

    <div className="flex justify-center items-center">
     {blog && <div className="flex flex-col w-[60%] overflow-hidden" >
      <h1 className='mt-1 text-3xl font-extrabold'>{blog.title}</h1>
      <div className="flex mt-4 mb-4">
        <small>{dateFormat(blog.createdon," mmmm dS, yyyy, h:MM")}</small><br/>
        <small>{blog.category}</small>
      </div>
      <img  className='rounded-lg' src={apiURL+blog.image} alt="" />
      <div>
        {/* <h2 className='text-2xl mt-2 mb-2 '>What is lorem ipsum </h2> */}
        {parse(blog.post)}
        
       
      </div>
      </div>}
    </div>
  )
}

export default Blog
