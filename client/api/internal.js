import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:5000/',
    withCredentials:true,
    headers:{
        "Content-Type":'application/json',
    },
});
//console.log(process.env.REACT_APP_INTERNAL_API_PATH);

// export const login = async (data)=>{
//     let response;
//     try{
//         response = await api.post('/user/login',data);
//     }
//     catch(error){
//         return error;
//     }
//     return response;
// }

export const signup = async(data)=>{
let response;
//console.log('this is data from signup function',data);
try{
response = await api.post('/user/signup',data); //this register is backend endpoint for signup
}
catch(error){
    console.error("Error occurred:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
}
return response;
}

// export const signout = async ()=>{
//     let response;
//     try{
//         response = await api.post('/logout');
//     }
//     catch(error){
//         return error;
//     }
//     return response;
// }
