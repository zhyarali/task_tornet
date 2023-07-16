// src/services/AuthService.js

import axios from 'axios';

const serverUrl = 'https://tmaua.tornest.net:1337/';

const token=localStorage.getItem('token');

const headers = {
    Authorization: `Bearer ${token}`
  };
  

export default {

  async getDepartment(accessToken,callback){
    return await axios.get(serverUrl+"api/department/list",{
      headers
    })
    .then(res=>{
        callback(res)
    })
    .catch(err=>{
        // callback({"status":"error"})
        console.log('response error '+err)
    
    })
},


async add(params,callback){
  return await axios.post(serverUrl+"api/department",params,{headers})
  .then(res=>{
      callback(res)
  })
  .catch(err=>{
      callback({"status":"error"})
      console.log('response error '+err)
  
  })
},
  


async update(id,params,callback){
  return await axios.post(serverUrl+"api/department/update/"+id+"?_method=put",params,{headers})
  .then(res=>{
      callback(res)
  })
  .catch(err=>{
      callback({"status":"error"})
      console.log('response error '+err)
  
  })
},


async delete(id,callback){
  return await axios.delete(serverUrl+"api/department/"+id,{headers})
  .then(res=>{
      callback(res)
  })
  .catch(err=>{
      callback({"status":"error"})
      console.log('response error '+err)
  
  })
},


};