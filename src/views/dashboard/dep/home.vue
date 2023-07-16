<template>
    <v-layout>
      <v-navigation-drawer
        class="bg-deep-purple "
        theme="dark"
        permanent
        app
        height="100vh"
        
      >
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard">{{fullname}}</v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="authLogout()">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main style="height: 100vh">
        

        <v-container class="mt-4 mb-4">


            <v-row class="alert mt-4">
<v-col class="col-11 col-sm-11 col-md-10 col-lg-10 col-xl-10 mx-auto text-center" v-if="error_msg!=null">
<v-alert
dense
type="warning"
>{{error_msg}}</v-alert>
</v-col>
<v-col class="col-11 col-sm-11 col-md-10 col-lg-10 col-xl-10 mx-auto text-center" v-if="success_msg!=null">
<v-alert
dense
type="success"
>{{success_msg}}</v-alert>
</v-col>
</v-row>


 
      <v-row class="d-flex  justify-center">
        <v-col cols="11">

            <div v-if="loading ">Loading...</div>
          <v-data-table
            v-else
            :headers="headers"
            :items="dept"
            :search="search"
        
            class="elevation-1  radius-15"
            :footer-props="{
            showFirstLastPage: true,
            prevIcon: 'mdi-arrow-left',
            nextIcon: 'mdi-arrow-right',
           'items-per-page-text':'PERPAGE', 
        
          }"
          :items-per-page="10"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><v-icon>mdi-account-group</v-icon>Departments</v-toolbar-title>
          <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
              

        <v-dialog
        
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
            v-if="can('department-create')"
              color="primary"
              dark
              class="mb-2"
              v-bind="props"
            >
              Add Department
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Add Department</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >

                  <v-text-field
                            v-model="departmentObject.name"
                            label="Name"
                          >
                          </v-text-field>
                          <v-text-field 
                            v-model="departmentObject.description"
                            label="Description"
                          >
                          </v-text-field>
                          <v-text-field 
                            v-model="departmentObject.code"
                            label="Code"
                          >
                          </v-text-field>
                   
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="dialog=false"
              >
                Cancel
              </v-btn>
              <v-btn
              v-if="isAdd()===true"
                color="blue-darken-1"
                variant="text"
                @click="saveUsers"
              >
                Add
              </v-btn>

              <v-btn
                v-if="isEdit()===true" 
                color="blue-darken-1"
                variant="text"
                @click="updateUsers(departmentObject.id)"
              >
                Update
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>

                <v-dialog persistent v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <v-icon>mdi-delete-circle</v-icon>
                      DELETE
                    </v-card-title>
                    <v-card-text>
                            ARE YOU SURE YOU WANT TO DELETE
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="red lighten-2"
                        dark
                        @click="deleteUsers(departmentObject.id)"
                      >
                        <v-icon>mdi-delete-circle</v-icon>
                        DELETE
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn justify="end" color="red darken-2" dark @click="closeDeleteDialog">
                        <v-icon> mdi-close-circle</v-icon>
                        CLOSE
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                  <v-spacer></v-spacer>
                  
                <v-row>
                  <v-col cols="12" md="10">
                    <v-text-field
                    
                      class="rabar-font"
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="SEARCH"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

              </v-toolbar>
            </template>
             <template v-slot:item.edit="{item}"> 

              <v-icon v-if="can('department-edit')" small class="mr-2 orange white--text px-2 py-2 rounded" @click="editDialog(item.raw)">
                mdi-pencil-circle
              </v-icon>



              <v-icon v-if="can('department-delete')"  small class="mr-2 red white--text px-2 py-2 rounded" @click="deleteDialog(item.raw)"> 
                mdi-delete-circle 
              </v-icon>
           
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>





      </v-main>


    </v-layout>



</template>


<script>
import departmentRequests from '../../../request/department';
import permissionRequests from '../../../request/permissions';

import { VDataTable } from 'vuetify/labs/VDataTable'

export default{

    components:{
        VDataTable
    },
  
    data: () => ({
        dialog:false,
        dialogDelete: false,
        snackbar:true,
        department: [],
        permissions: [],
        search:'',
        loading: true,
        error_msg:null,
        success_msg:null,
        editedIndex:-1,
        fullname:'',
        headers: [
          { title:'Name', key: "name",align: 'center'},
          { title: 'Description', key: "description",align: 'center'},
          { title: 'Code', key: "code",align: 'center'},
          {title: 'Actions',key: 'edit',sortable: false,align: 'center'},
        ],
        CURRENTFORM:'add',
        departmentObject: {
            name: '',
            description: '',
            code: '',
        },
    }),


    // watch: {
    //     options: {
    //        handler() {
    //       this.readData()
    //     },
    //    }
    // },

    mounted() {
       const token=localStorage.getItem('token')
        if(token==undefined){
            this.$router.push('/dashboard/login')
        }else{

            this.getdepartmentdata()
            this.getPermission()
            this.fullname=localStorage.getItem('fullname')

        }


    },


    
computed:{
    dept(){
        return this.$store.getters.getDepartment
    }
},

    methods: {

        getPermission(){
            const storedPermission = JSON.parse(localStorage.getItem("userPermission"));
            this.permissions=storedPermission
            
        },

         array_has (arr, obj) {
             return (arr.indexOf (obj) != -1);
        },

        can (permission) {
         return this.array_has(this.permissions, permission);
       },

        authLogout(){
            
            localStorage.removeItem('token');
            this.$router.push('/dashboard/login')

        },

        getdepartmentdata(){

            const token=localStorage.getItem('token')
            departmentRequests.getDepartment(token,(res)=>{

                // console.log(res.data.data)
                // this.$store.dispatch('getDepartment',res.data.data)
                // this.readData()
                // this.loading=false
               
                if (res.status===200) {
                console.log(res.data.data)
                this.$store.dispatch('getDepartment',res.data.data)
                this.readData()
                this.loading=false
                }else{
                    this.error_msg="wrong"
                    this.loading=false
                }
            })

        },

        isAdd(){
            if(this.CURRENTFORM==='add'){
            return true
            }
            else {
            return false
            }
        },

        isEdit(){
            if(this.CURRENTFORM==='edit'){
            return true
            }
            else {
            return false
            }
        },


        isLock(){
            if(this.CURRENTFORM==='lock'){
            return true
            }
            else {
            return false
            }
        },

        cleanMessages(){
            this.departmentObject ={}
            setTimeout(() => {
            this.success_msg=null
            this.error_msg=null
            }, 3000)
        },

        validate(params,callback){
            this.error_msg=null
            params.forEach(param=>{
            if(param=='' || param==undefined || param==null){
            this.error_msg = "please fill all fields !"
            }
            })
            if(this.error_msg==null){
            return callback()
            }
            this.cleanMessages()
        },

        editDialog(item) {
            this.CURRENTFORM = 'edit'
            this.editedIndex = this.department.indexOf(item)
            this.departmentObject = Object.assign({}, item)
            this.dialog = true
        },

        lockDialog(item) {
            this.CURRENTFORM = 'lock'
            this.departmentObject = Object.assign({}, item)
            this.dialog = true
        },

        deleteDialog(item) {
            this.CURRENTFORM =  'delete'
            this.editedIndex = this.department.indexOf(item)
            this.departmentObject = Object.assign({}, item)
            this.dialogDelete = true
        },

        closeMainDialog() {
            this.dialog = false
            this.$nextTick(() => {
            this.departmentObject = Object.assign({}, this.defaultItem)
            this.CURRENTFORM = 'add'
            })
        },

        closeDeleteDialog() {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.departmentObject = Object.assign({}, this.defaultItem)
            this.CURRENTFORM = 'add'
            })
        },

        readData() {
          this.department = this.$store.getters.getDepartment
        },


        saveUsers() {
            this.validate(
            [this.departmentObject.name,this.departmentObject.description,this.departmentObject.code],
            ()=>{
            departmentRequests.add({
            name:this.departmentObject.name,
            description:this.departmentObject.description,
            code:this.departmentObject.code,
            },(res)=>{


                if(res.data.status==="success"){

                    this.error_msg = null
                    this.success_msg = res.data.message
                    this.getdepartmentdata()

                }

            this.cleanMessages()
            })
            }
            )
            this.closeMainDialog()
        },

                
        updateUsers(Id) {
            this.validate(
            [this.departmentObject.name,this.departmentObject.description,this.departmentObject.code],
            ()=>{
            departmentRequests.update(Id,{
            name:this.departmentObject.name,
            description:this.departmentObject.description,
            code:this.departmentObject.code,
            },(res)=>{


                if(res.data.status==="success"){

                    this.error_msg = null
                    this.success_msg = res.data.message
                    this.getdepartmentdata()

                }

            this.cleanMessages()
            })
            }

            )
            this.closeMainDialog()
        },

                

        deleteUsers(Id) {

            departmentRequests.delete(Id,
            (res)=>{
                console.log(res)
                if(res.data.status==="success"){

                    this.error_msg = null
                    this.success_msg = res.data.message
                    this.getdepartmentdata()

                }

            this.cleanMessages()
            })

            this.closeDeleteDialog()
            },

        },


}

</script>