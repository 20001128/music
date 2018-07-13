export default[{
    path:'/downLoadLists',
    name:'downLoadLists',
    component:resolve => require(['../app'],resolve),
    redirect:{name:'downLoad'},
    children:[{
        path:'downLoad',
        name:'downLoad',
        component:resolve => require(['../pages/downLoad.vue'],resolve)
    }]
}]