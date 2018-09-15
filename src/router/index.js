import App from '../App'

const home = r => require.ensure([], () => r(require('@/pages/home/Home.vue')), 'home')
const city = r => require.ensure([], () => r(require('@/pages/city/City.vue')), 'city')
const login = r => require.ensure([], () => r(require('@/pages/other/Login.vue')), 'login');
const food = r => require.ensure([], () => r(require('@/pages/food/Food.vue')), 'food');
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
