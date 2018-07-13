/**
 * Created by Administrator on 2017-12-20.
 */
//首先是加载完所有的全局配置，即全局样式布局
//此处声明头部
import myHeader from './myHeader.vue';
import myHead from './myHead.vue';
import contentBox from './contentBox.vue'
import myFooter from './myFooter.vue'

export default {
  install (Vue) {
    //有没有也一样显示
    Vue.component('myHeader',myHeader);
    Vue.component('myHead',myHead);
    Vue.component('contentBox',contentBox);
    Vue.component('myFooter',myFooter)
  }
}
