import axios from 'axios';
const apiURL ="http://localhost:3000";

export const getBlogs=(cat)=>{
    if(!cat){
        cat="all";
    }
    return axios.get(apiURL+'/blogs/'+cat)
    .then(result=>{
        return result.data
    })
    .catch(error =>{
        return error

    })


}

export const createBlog=(data)=>{
    return axios.post(apiURL+'/blogs',data)
    .then(result=>{
        return result.data
    })
    .catch(error =>{
        return error

    })

}

export const getblogbyid=(id)=>{
    return axios.get(apiURL+'/blogsbyid/'+id)
    .then(result=>{
        return result.data
    })
    .catch(error =>{
        return error

    })

}


export const uploadFile=(file)=>{
    let formdata=new FormData();
        formdata.append('file',file);
        const config={
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        return axios.post(apiURL+'/blogimage',formdata,config)
    .then(result=>{
        return result.data
    })
    .catch(error =>{
        return error

    })
}