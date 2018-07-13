export default[{
    path:'/musics',
    name:'musics',
    component: resolve => require(['../app'],resolve),
    redirect:{name:'songType'},
    children:[{
        path:'songType',
        name:'songType',
        meta: { keepAlive: false },
        component:resolve => require(['../pages/songType.vue'],resolve)
    },{
        path:'singers',
        name:'singers',
        component:resolve => require(['../pages/singers.vue'],resolve)
    },{
        path:'ranking',
        name:'ranking',
        component:resolve => require(['../pages/ranking.vue'],resolve)
    },{
        path:'video',
        name:'video',
        component:resolve => require(['../pages/video.vue'],resolve)
    },{
        path:'receiver',
        name:'receiver',
        component:resolve => require(['../pages/receiver.vue'],resolve)
    },{
        path:'songTypeSinger',
        name:'songTypeSinger',
        component:resolve => require(['../pages/songTypeSinger.vue'],resolve)
    }]
}]