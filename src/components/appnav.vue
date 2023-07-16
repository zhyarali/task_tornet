<template>
    <div>
        
        <v-toolbar app dark color="transparent" class="px-5  d-none d-lg-flex d-xl-none">
        <v-toolbar-title>TorShopping</v-toolbar-title>
        <v-spacer></v-spacer>
        
         <v-btn
         class="mx-2"
           text
         >CATALOGUE</v-btn>

         <v-btn
         class="mx-2"
           text
         >FASHION</v-btn>

         <v-btn
         class="mx-2"
           text
         >FAVORITE</v-btn>

         <v-btn
         class="mx-2"
           text
         >LIFESTYLE</v-btn>

         <v-btn
         variant="flat"
            
           color="grey-darken-4"
         >SIGN UP</v-btn>

  
      </v-toolbar>
      
      <v-toolbar app dark color="blue-grey darken-3" class="hidden-sm-and-up">
        <v-toolbar-title>Tor Shopping</v-toolbar-title>
        <v-spacer></v-spacer>

      
        <v-btn
            
            @click.stop="drawer = !drawer"
          >
            <v-icon icon="mdi mdi-menu" size="x-large"></v-icon>
          </v-btn>


        <v-navigation-drawer
        v-model="drawer"
        temporary
      >
      


        <v-list density="compact" nav>
          <v-list-item title="Home" value="CATALOGUE"></v-list-item>
          <v-list-item  title="About" value="FASHION"></v-list-item>
          <v-list-item  title="About" value="FAVORITE"></v-list-item>
          <v-list-item  title="About" value="LIFESTYLE"></v-list-item>
        </v-list>
      </v-navigation-drawer>


      </v-toolbar>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                dialog:false,
                drawer:false,
            }
        },
    }
</script>