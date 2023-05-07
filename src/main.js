import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import { auth, onAuthStateChanged } from './firebase'


Vue.config.productionTip = false
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

onAuthStateChanged(auth, (user) => {
  console.log(user);

});
