import Vue from 'vue';
import VueRouter from 'vue-router';
import homeListenRouter from '../modules/homeIndex/router';
import searchRouter from '../modules/searchMore/router';
import musicDetailsRouter from '../modules/musicDetails/router';
import likeRouter from '../modules/like/router';
import localMusicRouter from '../modules/localMusic/router';
import songListsRouter from '../modules/songLists/router';
import downLoadRouter from '../modules/downLists/router';
import cancelListsRouter from '../modules/cancelLists/router';
import leftMainRouter from '../modules/leftMain/router';
import loginRouter from '../modules/login/router';
import musicsRouter from '../modules/musics/router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',  //a的切换样式
  routes: [
    ...homeListenRouter,
  ...searchRouter,
  ...musicDetailsRouter,
  ...likeRouter,
  ...localMusicRouter,
  ...songListsRouter,
  ...downLoadRouter,
  ...cancelListsRouter,
  ...leftMainRouter,
  ...loginRouter,
  ...musicsRouter,
{path: '*', redirect: '/homeIndex/index'}
]
})

