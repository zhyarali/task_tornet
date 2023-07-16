// src/services/AuthService.js

import axios from 'axios';

const serverUrl = 'https://tmaua.tornest.net:1337/' 


const token=localStorage.getItem('token');
const userId=localStorage.getItem('userId');

const headers = {
    Authorization: `Bearer ${token}`
  };
  

export default {
//   login(credentials) {
//     return axios
//       .post('/auth/login', credentials)
//       .then(response => response.data);
//   },

  async getPermissions(callback){
    return await axios.get(serverUrl+"api/role/"+userId,{headers})
    .then(res=>{
        callback(res)
    })
    .catch(err=>{
        callback({"status":"error"})
        console.log('response error '+err)
    
    })
},


  
};