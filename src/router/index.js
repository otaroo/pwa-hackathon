import Vue from 'vue'
import Router from 'vue-router'

import NowPlaying from '../components/NowPlaying'
import DetailView from '../components/DetailView'
import Upcoming from '../components/Upcoming'
import Booking from '../components/Booking'
import Booked from '../components/Booked'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NowPlaying',
      component: NowPlaying
    },
    {
      path: '/Detail/:id/:back',
      name: 'Detail',
      component: DetailView
    },
    {
      path: '/Upcoming',
      name: 'Upcoming',
      component: Upcoming
    },
    {
      path: '/Booking/:id/:back',
      name: 'Booking',
      component: Booking
    },
    {
      path: '/Booked',
      name: 'Booked',
      component: Booked
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
