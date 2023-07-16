// src/services/AuthService.js

import axios from 'axios';

const serverUrl = 'https://tmaua.tornest.net:1337/' 

export default {
//   login(credentials) {
//     return axios
//       .post('/auth/login', credentials)
//       .then(response => response.data);
//   },

  async authLogin(params,callback){
    return await axios.post(serverUrl+"api/auth/login",params)
    .then(res=>{
        callback(res)
    })
    .catch(err=>{
        callback({"status":"error"})
        console.log('response error '+err)
    
    })
},


  
};