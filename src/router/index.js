import App from '../App'

const home = r => require.ensure([], () => r(require('@/pages/home/Home.vue')), 'home')
const city = r => require.ensure([], () => r(require('@/pages/city/City.vue')), 'city')
const login = r => require.ensure([], () => r(require('@/pages/other/Login.vue')), 'login');
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
            component: city
        },
        {
            path: '/login',
            component:login
        }
    ]
}]
