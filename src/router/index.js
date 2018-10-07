import App from '../App'


const home = () => import('@/pages/home/Home.vue') //所有城市
const city = () => import('@/pages/city/City.vue') //搜索城市
const login = () => import('@/pages/other/Login.vue') //登录
const food = () => import('@/pages/food/Food.vue') //店家主页

const search = () => import('@/pages/search/Search.vue') //搜索美食 店家

export default [{
    path: '/',
    component: App,
    children: [
        {
            path: "",
            redirect: '/home'
        },

        {
            path: '/home',
            component: home,
            meta: { keepAlive: true },
        },
        {
            path: '/city',
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
            component: food,
            meta: { keepAlive: false }
        },
        {
            path: '/search',
            component: search
        }
    ]
}]
