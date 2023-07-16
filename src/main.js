import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import axios from 'axios'
import VueAxios from 'vue-axios'

loadFonts()

// const serverUrl = 'https://tmaua.tornest.net:1337/' 
// store.state.serverurl = serverUrl
// // app.config.productionTip = false
// axios.defaults.baseURL = serverUrl+'/api'

axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')
