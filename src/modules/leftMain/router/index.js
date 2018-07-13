/**
 * Created by Administrator on 2018-02-28.
 */
export default[{
  path:'/leftMain',
  name:'leftMain',
  component: resolve => require(['../app'],resolve),
  redirect:{name:'left'},
  children:[{
    path: 'left',
    name: 'left',
    component: resolve => require(['../pages/left'], resolve),
  }]
}]
