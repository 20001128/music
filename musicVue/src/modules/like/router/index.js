export default[{
    path:'/musicLike',
    name:'musicLike',
    component: resolve => require(['../app'],resolve),
    redirect:{name:'like'},
    children:[{
        path:'like',
        name:'like',
        component: resolve => require(['../pages/like.vue'],resolve)
    }]
}]