import axios from "axios"



export const updateProfile = async ({url,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/updateProfilePicture`,{url},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}
export const updateCover = async ({url,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/updateCoverPicture`,{url},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const addFriend = async ({id,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/addFriend/${id}`,{},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const deleteRequest = async ({id,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/deleteRequest/${id}`,{},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const follow = async ({id,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/follow/${id}`,{},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const unFollow = async ({id,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/unFollow/${id}`,{},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const acceptRequest = async ({id,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/acceptRequest/${id}`,{},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const unFriend = async ({id,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/unFriend/${id}`,{},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const cancelFriend = async ({id,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/cancelFriend/${id}`,{},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const searchFriends = async ({search,token}) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/search/${search}`,{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}

export const addToSearchHistry = async ({searchUserId,token}) => {
    const createdAt = new Date()
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/addToSearchHistry`,{searchUserId,createdAt},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}
export const getSearchHistry = async ({token}) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getSearchHistry`,{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}
export const removeSearchHistry = async ({removeId,token}) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/removeSearchHistry`,{removeId},{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}
export const getFriendsPageInfo = async ({token}) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getFriendsPageInfo`,{
            headers:{
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}