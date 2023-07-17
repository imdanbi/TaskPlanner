import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue)

createApp(App).use(store).use(router).mount('#app')
