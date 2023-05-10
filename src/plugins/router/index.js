import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderTracking from '@/views/OrderTracking.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/order-tracking',
    name: 'OrderTracking',
    component: OrderTracking
  }
]

;['push', 'replace'].forEach((method) => {
  const originalMethod = VueRouter.prototype[method]
  VueRouter.prototype[method] = function m(location) {
    return originalMethod.call(this, location).catch((error) => {
      if (error.name !== 'NavigationDuplicated') {
        // capture exception
      }
    })
  }
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
