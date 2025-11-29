import axios from 'axios'

const checkAuth = async () =>{
    try{
        const response = await axios.get('http://localhost:5000/home' , {
            withCredentials : true
        })
        return true
    }catch (err){
        return false
    }
}

export {checkAuth}