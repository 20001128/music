import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResourse from 'vue-resource';
import App from './App.vue';
//导入了全局的js文件
import comp from './components/atomComponents'
import router from './router/router'
import vuexI18n from 'vuex-i18n'
import stores from './store'
import jsonp from 'vue-jsonp'

import likeStore from './modules/like/store'

Vue.config.debug = false;

Vue.use(Vuex);
// Vue.use(VueResourse);
// Vue.use(Vueaxios, axios)
Vue.use(jsonp)
//要注册这个全局配置
Vue.use(comp);
const store = new Vuex.Store(stores);
Vue.use(vuexI18n.plugin, store);
const translationsEn = {
  "content": "This is some {type} content"
};

Vue.i18n.add('en', translationsEn);

Vue.i18n.set('en');

new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: { App }
})
