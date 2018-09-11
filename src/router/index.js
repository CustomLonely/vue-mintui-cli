<<<<<<< HEAD
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
=======
// import Vue from 'vue'
// import Router from 'vue-router'
// // import Header from '@/components/Header.vue'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {

//     }
//   ]
// })
>>>>>>> f3bf9c5cb26d9f378ff5c3205bdeda7aad488254
