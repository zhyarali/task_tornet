<template>
      <v-col cols="6" :md="cols" :lg="cols">
          <v-card
            
            
            elevation="0"
          >
            <v-img
              class=" rounded-lg"
              height="400"
              :src="image"
              cover
            > </v-img>

             <div  class="d-flex justify-space-between  " style="align-items: center;">
                <div>
                  <v-card-title class="pt-4">
                    {{ title }}
            </v-card-title>

            <v-card-subtitle>Explore Now!</v-card-subtitle>
                </div>

                <v-btn  text elevation="0"><v-icon icon="mdi-arrow-right"></v-icon></v-btn>
             </div>
        
          </v-card>
         </v-col>
</template>

<script>
 export default {
        props:['title','image','cols']
    }
</script>