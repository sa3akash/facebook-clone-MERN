import axios from "axios"



export const createPost = async ({type,background, text,images,user, token}) => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/createPost`,{type, background,text,images,user},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const reactPost = async ({postId,selectReact,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/reactPost`,{postId:postId,react:selectReact},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const getReactById = async ({postId,token}) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getReactsById/${postId}`,{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const comment = async ({postId,message,image,token}) => {
    let commentAt = new Date()
    try{
        const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/comment`,{postId,message,image,commentAt},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return data;
    }catch(err){
        return err.response.data.message;
    }
}

export const savedPost = async ({postId,token}) => {
    let savedAt = new Date()
    try{
        const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/savedPost/${postId}`,{savedAt:savedAt},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return data;
    }catch(err){
        return err.response.data.message;
    }
}

export const deletePost = async ({postId,token}) => {

    try{
        const {data} = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deletePost/${postId}`,{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return data;
    }catch(err){
        return err.response.data.message;
    }
}