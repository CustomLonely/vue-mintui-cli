import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/Home.vue')), 'home')

export default [{
    path: '/',
    component: App,
    children: [
        {
            path: "/Home",
            component: home
        },
    ]
}]
