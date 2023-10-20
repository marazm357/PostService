import MainPage from '@/pages/MainPage.vue'
import PostPage from '@/pages/PostPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import PostIdPage from '@/pages/PostIdPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import {createRouter, createWebHistory} from 'vue-router'
import PostPageWithStore from '@/pages/PostPageWithStore.vue'
import PostPageCompositionApi from '@/pages/PostPageCompositionApi.vue'

const isAutorized = true

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/store',
    component: PostPageWithStore
  },
  {
    path: '/composition',
    component: PostPageCompositionApi
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAutorized) next({ name: 'login' })
  else next()
})

export default router;