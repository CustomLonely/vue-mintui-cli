import App from '../App'


const home = () => import('@/pages/home/Home.vue')
const city = () => import('@/pages/city/City.vue')
const login = () => import('@/pages/other/Login.vue')
const food = () => import('@/pages/food/Food.vue')

export default [{
    path: '/',
    component: App,
    children: [
        {
            path: "",
            component: home,
            meta: { keepAlive: true },
        },
    
        {
            path: '/home',
            component: home,
            meta: { keepAlive: true },
        },
        {
            path: '/city/:cityid',
            component: city,
            name: 'city',
            meta: { keepAlive: false },
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/food',
            name: 'food',
            component: food
        }
    ]
}]
