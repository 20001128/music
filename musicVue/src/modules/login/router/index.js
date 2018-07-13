export default[{
    path:'/login',
    name:'login',
    component:resolve => require(['../app'],resolve),
    redirect:{name:'registar'},
    children:[{
        path:'registar',
        name:'registar',
        component:resolve => require(['../pages/registar.vue'],resolve)
    },{
        path:'userInfo',
        name:'userInfo',
        component:resolve => require(['../pages/userInfo.vue'],resolve)
    }]
}]