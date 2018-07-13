export default[{
    path:'/musicDetails',
    name:'musicDetails',
    component: resolve => require(['../app'],resolve),
    redirect:{name:'musicDetail'},
    children:[{
        path:'musicDetail',
        name:'musicDetail',
        component: resolve => require(['../pages/musicDetail.vue'],resolve)
    }]
}]