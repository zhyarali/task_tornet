# newtasktornet

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



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
          <v-list-item link prepend-icon="mdi-view-dashboard" title="Add Department"></v-list-item>
          <v-list-item link prepend-icon="mdi-account-box" title="View All"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
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

 
      <v-row class="d-flex text--purple justify-center">
        <v-col cols="11">
          <v-data-table
            :headers="headers"
            :items="{}"
            :loading="$store.state.department==null || $store.state.department=='' || $store.state.department==undefined ? true : false"
            :search="search"
            sort-by="name"
            class="elevation-1 rabar-font radius-15"
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
                <v-toolbar-title><v-icon>mdi-account-group</v-icon>USERS</v-toolbar-title>
          <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="success"
                      style="color: whitefloat:right"
                      class="mb-2 radius-5 rabar-font"
                      v-bind="attrs"
                      v-on="on"
                    >
                          <v-icon>
                          mdi-plus-circle
                          </v-icon>
                      ADD
                    </v-btn>
                  </template>
                  <v-card class="radius-15 bg-mode">
                    <v-card-title>
<span class="rabar-font" v-if="isAdd()===true"><v-icon> mdi-plus-circle</v-icon> ADD</span>
<span class="rabar-font" v-if="isEdit()===true"><v-icon> mdi-pencil-circle</v-icon> UPDATE</span>
<span class="rabar-font" v-if="isLock()===true"><v-icon> mdi-lock</v-icon> CHANGE</span>
                    </v-card-title>
                    <v-card-text class="radius-15">
                      <v-container>
                        <v-form>
                          <v-text-field v-if="isAdd()===true || isEdit()===true"
                            class="rabar-font"
                            append-icon="mdi-format-title"
                            v-model="departmentObject.name"
                            label="NAME"
                          >
                          </v-text-field>
                          <v-text-field v-if="isAdd()===true || isEdit()===true"
                            class="rabar-font"
                            append-icon="mdi-email"
                            v-model="departmentObject.description"
                            label="Description"
                          >
                          </v-text-field>
                         
                     
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="green darken-1" v-if="isAdd()===true" dark @click="saveUsers">
                        <v-icon dark> mdi-plus-circle</v-icon>
                        SAVE
                      </v-btn>
                      <v-btn 
                       color="orange darken-1" v-if="isEdit()===true" 
                       dark @click="updateUsers(departmentObject.id)"
                       >
                       <v-icon dark> mdi-pencil-circle</v-icon>
                        UPDATE
                      </v-btn>
                      <v-btn 
                       color="orange darken-1" v-if="isLock()===true" 
                       dark @click="updateUsersPassword(departmentObject.id)"
                       >
                       <v-icon dark> mdi-pencil-circle</v-icon>
                        CHANGE
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" dark @click="closeMainDialog">
                        <v-icon dark>mdi-close-circle</v-icon>
                        CLOSE
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
                            ARE_YOU_SURE_YOU_WANT_TO_DELETE
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
              <v-icon small class="mr-2 orange white--text px-2 py-2 rounded" @click="editDialog(item)">
                mdi-pencil-circle
              </v-icon>
              <v-icon small class="mr-2 red white--text px-2 py-2 rounded" @click="deleteDialog(item)"> 
                mdi-delete-circle 
              </v-icon>
              <v-icon small class="mr-2 blue white--text px-2 py-2 rounded" @click="lockDialog(item)"> 
                mdi-lock 
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

export default{
  
    data: () => ({
        dialog:false,
        dialogDelete: false,
        snackbar:true,
        department: [],
        search:'',
        loading: true,
        error_msg:null,
        success_msg:null,
        headers: [
          { text: '#', value: "id",align: 'center'},
          { text:'Name', value: "name",align: 'center'},
          { text: 'Description', value: "email",align: 'center'},
          { text: 'Code', value: "role",align: 'center'},
          {text: 'Actions',value: 'edit',sortable: false,align: 'center'},
        ],
        CURRENTFORM:'add',
        departmentObject: {
            name: '',
            description: '',
            code: '',
        },
    }),


    watch: {
        options: {
           handler() {
          this.readData()
        },
       }
    },

    mounted() {
       const token=localStorage.getItem('token')
        if(token==undefined){
            this.$router.push('/dashboard/login')
        }else{

            departmentRequests.getDepartment((res)=>{
                if (res.status===200) {
                console.log(res.data.data)
                this.$store.dispatch('getDepartment',res.data.data)
                }else{
                    this.error_msg="wrong"
                }
            })


            this.readData()



        }


    },


    methods: {
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
            this.error_msg = "DATA_REQUIRED"
            }
            })
            if(this.error_msg==null){
            return callback()
            }
            this.cleanMessages()
        },

        editDialog(item) {
            this.CURRENTFORM = 'edit'
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
            [this.departmentObject.name,this.departmentObject.email,this.departmentObject.role,this.departmentObject.password],
            ()=>{
            UsersRequests.add({
            addUsers:true,
            name:this.departmentObject.name,
            email:this.departmentObject.email,
            role:this.departmentObject.role,
            pass:this.departmentObject.password
            },(res)=>{
            if (res.data.status===false){
            this.error_msg = res.data.msg
            }
            else if (res.data.status===true) {
            this.error_msg = null
            this.success_msg = res.data.msg
            this.$store.state.users = res.data.data
            this.users = res.data.data
            }
            this.cleanMessages()
            })
            }
            )
            this.closeMainDialog()
        },

                
        updateUsers(userId) {
            this.validate(
            [this.departmentObject.name,this.departmentObject.email,this.departmentObject.role],
            ()=>{
            UsersRequests.edit({
            editUsers:true,
            user_id:userId,
            name:this.departmentObject.name,
            email:this.departmentObject.email,
            role:this.departmentObject.role,
            },(res)=>{
            if (res.data.status===false){
            this.error_msg = res.data.msg
            }
            else if (res.data.status===true) {
            this.error_msg = null
            this.success_msg = res.data.msg
            this.$store.state.users = res.data.data
            this.users = res.data.data
            }
            this.cleanMessages()
            })
            }
            )
            this.closeMainDialog()
        },

                
        updateUsersPassword(userId) {
            this.validate(
            [this.departmentObject.newpassword],
            ()=>{
            UsersRequests.changePassword({
            changePassword:true,
            user_id:userId,
            newpassword:this.departmentObject.newpassword,
            },(res)=>{
            if (res.data.status===false){
            this.error_msg = res.data.msg
            }
            else if (res.data.status===true) {
            this.error_msg = null
            this.success_msg = res.data.msg
            this.$store.state.users = res.data.data
            this.users = res.data.data
            }
            this.cleanMessages()
            })
            }
            )
            this.closeMainDialog()
        },


        deleteUsers(userId) {
            if(userId==localStorage.getItem('dashboardauthId')){
            this.error_msg = 'INVALID_REQUEST';
            }
            else {
            UsersRequests.delete({deleteUsers:true,user_id:userId},(res)=>{
            if (res.data.status===false){
            this.error_msg = res.data.msg
            }
            else if (res.data.status===true) {
            this.error_msg = null
            this.success_msg = res.data.msg
            this.$store.state.users = res.data.data
            this.users = res.data.data 
            }
            })
            }
            this.cleanMessages()
            this.closeDeleteDialog()
            },

        },


}

</script>"# task_tornet" 
