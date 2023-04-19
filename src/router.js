import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Storage Dashboard
        {
			name: 'Storage Dashboard',
			path: 'StorageDashboard',
			component: () => import('@/views/dashboard/StorageDashboard'),
		  },
        // Backups Dashboard
        {
			name: 'Backups Dashboard',
			path: 'BackupsDashboard',
			component: () => import('@/views/dashboard/BackupsDashboard'),
		  },
        // Insert Dashboard JOB
        {
          name: 'Insert Job',
          path: 'insertJob',
          component: () => import('@/views/dashboard/insertJob'),
          },
			// Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
      ],
    },
  ],
})
