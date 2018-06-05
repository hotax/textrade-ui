import Vue from 'vue'
import VueRouter from 'vue-router'
import state from './state'

import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import Tickets from './components/Tickets.vue'
import NewTicket from './components/NewTicket.vue'
import Ticket from './components/Ticket.vue'
import Login from './components/Login.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter);

const routes = [{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/faq',
		name: 'faq',
		component: FAQ
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			guest: true
		},
		component: Login
	},
	{
		path: '/tickets',
		meta: {
			private: true
		},
		component: TicketsLayout,
		children: [{
				path: '',
				name: 'tickets',
				component: Tickets
			},
			{
				path: 'new',
				name: 'new-ticket',
				component: NewTicket
			},
			{
				path: ':id',
				name: 'ticket',
				component: Ticket,
				props: true
			},
		],
	},
	{
		path: '*',
		component: NotFound
	},
];

const router = new VueRouter({
	routes,
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.private) && !state.user) {
		next({
			name: 'login',
			params: {
				wantedRoute: to.fullPath
			}
		});
		return;
	}
	if (to.matched.some(r => r.meta.guest) && state.user) {
		next({
			name: 'home'
		});
		return;
	}
	next();
});

export default router;
