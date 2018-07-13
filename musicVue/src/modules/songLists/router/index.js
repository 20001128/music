export default[{
    path:'/songLists',
    name:'songLists',
    component:resolve => require(['../app'],resolve),
    redirect:{name:'lists'},
    children:[{
        path:'lists',
        name:'lists',
        component:resolve => require(['../pages/lists'],resolve)
		},
		{
				path:'listMusics',
				name:'listMusics',
				component:resolve => require(['../pages/listMusics'],resolve)
		}]
}]
