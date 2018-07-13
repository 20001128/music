/**
 * Created by Administrator on 2018-03-01.
 */
export default [{
  path:'/search',
  name:'search',
  component: resolve => require(['../app'],resolve),
  redirect:{name:'song'},
  children:[{
    path:'song',
    name:'song',
    component: resolve => require(['../pages/search'],resolve)
  }]
}]
