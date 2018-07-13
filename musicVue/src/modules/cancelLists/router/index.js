export default[{
    path:'/cancelLists',
    name:'cancelLists',
    component:resolve => require(['../app'],resolve),
    redirect:{name:'cancel'},
    children:[{
        path:'cancel',
        name:'cancel',
        component:resolve => require(['../pages/cancel.vue'],resolve)
    }]
}]