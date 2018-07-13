export default[{
    path:'/localMusic',
    name:'localMusic',
    component:resolve => require(['../app'],resolve),
    redirect:{name:'songs'},
    children:[{
        path:'songs',
        name:'songs',
        component:resolve => require(['../pages/songs.vue'],resolve)
    }]
}]