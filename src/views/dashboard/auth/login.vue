<template>
    <VContainer fluid class="fill-height">
      <VRow no-gutters align="center" justify="center" class="fill-height">
        <VCol cols="12" md="6" lg="5" sm="6">
          <VRow no-gutters align="center" justify="center">
            <VCol cols="12" md="7" >
              <center>
                <h1>Login</h1>
              <p class="text-medium-emphasis">Enter your details to get started</p>
              <p v-if="error_login!=''" class="text-medium-emphasis" style="color:red !important">your information is wrong !</p>
              </center>
             
  
              <VForm @submit.prevent="login" class="mt-7">
                <div class="mt-1">
                  <label class="label text-grey-darken-2" for="email">Email</label>
                  <VTextField
                    :rules="[ruleRequired, ruleEmail]"
                    v-model="email"
                    prepend-inner-icon="mdi-email"
                    id="email"
                    name="email"
                    type="email"
                  />
                </div>
                <div class="mt-1">
                  <label class="label text-grey-darken-2" for="password">Password</label>
                  <VTextField
                    :rules="[ruleRequired, rulePassLen]"
                    v-model="password"
                    prepend-inner-icon="mdi-lock"
                    id="password"
                    name="password"
                    type="password"
                  />
                </div>
                <div class="mt-5">
                  <VBtn type="submit" block min-height="44" class="gradient primary">Login</VBtn>
                </div>
              </VForm>


            </VCol>
          </VRow>
        </VCol>

   
      </VRow>
    </VContainer>
  </template>
  
  <script>
  import {ref} from 'vue';
  import loginRequests from '../../../request/login';
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'

  export default{
    mounted(){
      const token=localStorage.getItem('token')
      if(token==undefined){
            
        }else{
          this.$router.push('/dashboard/home')
        }
    },
    setup(){
      const store = useStore()
      const router = useRouter()
      const email = ref("");
  const password = ref("");
  const error_login=ref("")

  // const count= store.state.count
  
  const ruleRequired= v => !!v || "Required";
  const ruleEmail= value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || "Enter a valid email"};
  const rulePassLen=v =>
        (!!v && v.length >= 6) || "Password must be 6 chars or more";      





function login() {
loginRequests.authLogin({
email:email.value,
password:password.value,
  },(res)=>{
    if (res.status===200) {
      localStorage.setItem('token',res.data.access_token);
      localStorage.setItem('userId',res.data.user.id);
      localStorage.setItem('fullname',res.data.user.fullname);
      localStorage.setItem('userPermission',JSON.stringify(res.data.user.permissions));
      store.dispatch('login',res.data.access_token,res.data.user)
      router.push('/dashboard/home')
    }else{
      error_login.value="wrong"
    }
})

}





  return {
    email,
     password,
     login,
     ruleEmail,
     rulePassLen,
     ruleRequired,
     error_login,
     

    }
    }
  }

 

  </script>




<style>

@use "vuetify" with ( $body-font-family: $family );
 :root {
	 font-family: "Inter", sans-serif;
}
 @supports (font-variation-settings: normal) {
	 :root {
		 font-family: "Inter var", sans-serif;
	}
}
 a {
	 color: inherit;
	 text-decoration: none;
}
 .v-text-field .v-field__outline__start {
	 border-radius: 10px 0 0 10px !important;
}
 .v-text-field .v-field__outline__end {
	 border-radius: 0 10px 10px 0 !important;
}
 .v-btn {
	 font-weight: 700 !important;
}
 .label {
	 font-weight: 600;
	 font-size: 15px;
	 margin-bottom: 6px;
	 display: inline-block;
	 cursor: pointer;
}
 .gradient.primary {
	 color: white;
	 background: linear-gradient(318deg, rgba(67, 56, 202, 1) 12%, rgba(79, 70, 229, 1) 38%, rgba(99, 102, 241, 1) 100%) !important;
}
 .gradient.cancel {
	 background: linear-gradient(318deg, rgba(203, 213, 225, 1) 12%, rgba(226, 232, 240, 1) 38%, rgba(241, 245, 249, 1) 100%) !important;
}
 .gradient.success {
	 color: white;
	 background: linear-gradient(318deg, rgba(21, 128, 61, 1) 12%, rgba(22, 163, 74, 1) 38%, rgba(34, 197, 94, 1) 100%) !important;
}
 .gradient.info {
	 color: white;
	 background: linear-gradient(318deg, rgba(30, 64, 175, 1) 12%, rgba(37, 99, 235, 1) 38%, rgba(59, 130, 246, 1) 100%) !important;
}
 .gradient.warn {
	 color: white;
	 background: linear-gradient(318deg, rgba(180, 83, 9, 1) 12%, rgba(217, 119, 6, 1) 38%, rgba(245, 158, 11, 1) 100%) !important;
}
 .gradient.error {
	 color: white;
	 background: linear-gradient(318deg, rgba(153, 27, 27, 1) 12%, rgba(220, 38, 38, 1) 38%, rgba(248, 113, 113, 1) 100%) !important;
}
 .gradient.gray {
	 color: white;
	 background: linear-gradient(318deg, rgba(30, 41, 59, 1) 12%, rgba(44, 55, 74, 1) 38%, rgba(71, 85, 105, 1) 100%) !important;
}
 

</style>
  