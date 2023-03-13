import axios from "axios"



export const uploadImages = async ({formData, path,token}) => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/uploadImages`,formData,{
            headers:{
                'Content-Type':'multipart/form-data',
                Authorization: `bearer ${token}`
            }
        })
        return res;
    }catch(err){
        return err.response.data.message;
    }
}