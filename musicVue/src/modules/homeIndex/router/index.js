/**
 * Created by Administrator on 2018-02-28.
 */
export default[{
  path:'/homeIndex',
  name:'homeIndex',
  component: resolve => require(['../app'],resolve),
  redirect:{name:'listen'},
  children:[{
    path: 'index',
    name: 'index',
    component: resolve => require(['../pages/index'], resolve),
    children: [{
        path: 'listen',
        name: 'listen',
        component: resolve => require(['../pages/listen'], resolve)
      }, {
        path: 'musics',
        name: 'musics',
        component: resolve => require(['../pages/musics'], resolve)
      }, {
        path: 'sing',
        name: 'sing',
        component: resolve => require(['../pages/sing'], resolve)
      }
    ]
  }]
}]
