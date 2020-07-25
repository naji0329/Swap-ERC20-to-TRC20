import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';
import './registerServiceWorker';
//import web3 from '../embarkArtifacts/embarkjs';
// import Web3 from 'web3';
// Vue.prototype.$web3 = new Web3 (
//   new Web3.providers.HttpProvider (
//     'https://goerli.infura.io/v3/06a5d40111fe41f6a983cf17f5874505'
//   )
// );

import EmbakJS from "../embarkArtifacts/embarkjs";
Vue.component ('loading', Loading);
Vue.config.productionTip = false;

new Vue ({
  EmbakJS,
  router,
  store,
  render: h => h (App),
}).$mount ('#app');
