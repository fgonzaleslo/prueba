import Vue from 'vue'
import App from './App.vue'
import Alfa from './Alfa.vue'
import "./assets/css/bootstrap.min.css";
import "./assets/css/spaces.css"
import "./assets/css/typografy.css"
import "./assets/css/custom.css"
import 'vueperslides/dist/vueperslides.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(Alfa),
}).$mount('#alfa')