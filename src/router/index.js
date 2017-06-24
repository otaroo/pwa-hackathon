import Vue from 'vue'
import Router from 'vue-router'

import NowPlaying from '../components/NowPlaying'
import DetailView from '../components/DetailView'
import Upcoming from '../components/Upcoming'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NowPlaying',
      component: NowPlaying
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/Upcoming',
      name: 'Upcoming',
      component: Upcoming
    }
  ]
})
