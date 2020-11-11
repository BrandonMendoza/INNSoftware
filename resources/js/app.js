import '@/styles/index.scss';
import 'core-js';
import Vue from 'vue';
import Cookies from 'js-cookie';
import ElementUI from 'element-ui';
import App from './views/App';
import store from './store';
import router from '@/router';
import i18n from './lang'; // Internationalization
import '@/icons'; // icon
import '@/permission'; // permission control
//Nuevas librerias
import VueTheMask from 'vue-the-mask';
import VueNumeric from 'vue-numeric';
import AFTableColumn from 'af-table-column';
import VueBarcodeScanner from 'vue-barcode-scanner';
//import PerfectScrollbar from 'perfect-scrollbar';
//import "perfect-scrollbar/css/perfect-scrollbar.css";





import * as filters from './filters'; // global filters

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
/**VueBarcodeScanner OPTIONS */
let options = {
  sound: false, // default is false
  // soundSrc: '/static/sound.wav', // default is blank
  sensitivity: 10, // default is 100
  requiredAttr: true, // default is false
  controlSequenceKeys: ['NumLock', 'Clear'], // default is null
  callbackAfterTimeout: true // default is false
}

//Nuevas librerias
Vue.use(VueTheMask);
Vue.use(VueNumeric)
Vue.use(require('vue-moment'));
Vue.use(AFTableColumn)
Vue.use(VueBarcodeScanner, options);


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});
