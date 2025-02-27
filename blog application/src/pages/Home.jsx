import React, { useState,useEffect } from 'react';
import Blogcard from '../components/Blogcard';
import { getBlogs } from '../api/Api';
import {useSearchParams} from 'react-router-dom';
function Home(){
    let [searchParams,setSearchParams]=useSearchParams();

    const [blogs,setBlogs]=useState(null);

    useEffect(()=>{
        async function fetchData(){

            const allBlogs=await getBlogs();
            setBlogs(allBlogs.data);
        }
        fetchData();
    },[])

    useEffect(()=>{
        async function fetchData(){

            const allBlogs=await getBlogs(searchParams.get('category'));
            setBlogs(allBlogs.data);
        }
        fetchData();
    },[searchParams])
    
    // const data =[
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/200/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/201/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/203/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/204/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/205/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/206/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/207/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    //     {
    //         title:"Is it worth investing in real estate",
    //         image:'https://picsum.photos/id/208/300/200',
    //         description:'lorem ipsum is madif wuf fjhdfd  yegf gefyugyuegfyug ye yeg uffygss  fe gf',
    //         createdon:'24 Jan ,2024',
    //         comments:'0'
    //     },
    // ]

    return (
        <>
        {/* <p>{JSON.stringify(blogs)}</p> */}
        <div className="grid sm:grid-cols-3 gap-5">
            {blogs && blogs.map((x,i)=>{
                return <Blogcard key={i} blogdata={x} />
            })}
            
        </div>
        </>
    )
}
export default Home;