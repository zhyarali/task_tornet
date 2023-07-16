<template>
  <App_Nav/>
 <Landing_Page/>

 <Home_Brands/>

 <v-container class="mt-8">
   <h1 style="font-weight: bolder;">NEW ARRIVALS</h1>
 </v-container>

 <v-container>
    <v-row class="d-flex justify-center flex-wrap">
       <Arrival_Card cols="4" title=" Hoodies & Sweetsshirt" image="https://images.pexels.com/photos/2608344/pexels-photo-2608344.jpeg?auto=compress&cs=tinysrgb&w=600" />
       <Arrival_Card cols="4" title="Coats & Parkas" image="https://images.pexels.com/photos/9419098/pexels-photo-9419098.jpeg?auto=compress&cs=tinysrgb&w=600" />
       <Arrival_Card cols="4" title="Tees & T-Shirt" image="https://images.pexels.com/photos/2220315/pexels-photo-2220315.jpeg?auto=compress&cs=tinysrgb&w=600" />
    </v-row>
 </v-container>





 <div style="background: linear-gradient(90deg, rgba(254,232,89,1) 0%, rgba(208,179,47,1) 100%, rgba(0,212,255,1) 100%);" class="mt-5 pa-10">
   <v-row
     align="center"
     md="10"
     class="d-flex justify-space-between  flex-wrap"
   >

   
   <v-col md="7" lg="7" cols="10" align="center">
       <v-img
 max-width="480"
 src="https://static.vecteezy.com/system/resources/previews/008/475/566/original/beautiful-young-asian-woman-with-shopping-bags-file-png.png"
></v-img>

       
     </v-col>


     <v-col md="5" lg="5" cols="10" style="align-content: end;">
       <v-card style="background: none !important" elevation="0">
         <v-card-text
           class=" text-h2 font-weight-bold text-mode mb-5 "

          
         >
           Tor Shopping
         </v-card-text>

        

         <v-card-text
           class="text-mode mb-3  text-h6"
   
         >
          Spend  minimal $100 get 30% off voucher code for your next purchase
         </v-card-text>

         <v-card-text
           class="text-mode mb-3 font-weight-bold text-h6"
   
         >
          1 June - 10 June 2023
         </v-card-text>

         <v-card-text
           class="text-mode mb-3 font-weight-bold text-h6"
   
         >
          *Terms Conditions apply
         </v-card-text>

       </v-card>

         <v-btn class="mx-5 px-10 pb-8 pt-5" color="black">Shop Now</v-btn>
     

     </v-col>

   </v-row>
 </div>





 <v-container class="mt-8">
   <h1 style="font-weight: bolder;">Young's Favourite</h1>
 </v-container>

 <v-container>
    <v-row class="d-flex justify-center flex-wrap">
       <Arrival_Card cols="6" title="Trending On Instagram" image="https://retailinsider.b-cdn.net/wp-content/uploads/2022/10/Picture4.png" />
       <Arrival_Card cols="6" title="All Under $40" image="https://i.insider.com/60a2c763f27b4c0019444ecc?width=700" />
    </v-row>
 </v-container>



<div style="background: linear-gradient(90deg, rgba(254,232,89,1) 0%, rgba(208,179,47,1) 100%, rgba(0,212,255,1) 100%);" class="mt-5 pa-16">
  <v-row class="d-flex justify-center flex-wrap mt-10">
    <h1 style="color:white">JOIN SHOPPING COMMUNITY TO</h1> 
  </v-row>
  <v-row class="d-flex justify-center flex-wrap">
    <h1 style="color:white">GET MONTHLY PROMO</h1> 
  </v-row>

  <v-row class="d-flex justify-center flex-wrap mt-10">
    <p style="color:white;font-size:20px">Type your email down below and be young wild generation</p> 
  </v-row>



  <v-row class="d-flex justify-center flex-wrap mt-10">
  <v-col lg="4" md="5" cols="12">
      <v-combobox
        class="combobox"
        variant="solo"   
        label="Add you email here" 
      >
        <template v-slot:append>
          <v-btn 
            class="ml-0 searchBtn"
          color="black"
            size="x-large"
          >
          SEND
          </v-btn>
        </template>
      </v-combobox>
    </v-col>

  </v-row>    


</div>



 <App_Footer/>


</template>

<script>
import App_Nav from '../components/appnav.vue';
import App_Footer from '../components/footer.vue';
import Landing_Page from '../components/landingPage.vue';
import Home_Brands from '../components/brands.vue';
import Arrival_Card from '../components/arrivalCard.vue';

export default {
  components:{App_Nav,Landing_Page,Arrival_Card,Home_Brands,App_Footer}
}

</script>


<style>
@media screen and (max-width: 600px) {
  .text-h2{
    font-size:20px !important;
    margin-bottom: 4px !important;
  }
}
</style>