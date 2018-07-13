export default[{
    path:'/sing',
    name:'sing',
    component: resolve => require(['../app'],resolve),
    redirect:{name:'perform'},
    children:[{
        path:'perform',
        name:'perform',
        component:resolve => require(['../pages/perform.vue'],resolve)
    }]
}]