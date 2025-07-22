import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/routes',
	},
	{
		path: '/routes',
		name: 'Routes',
		component: () => import('@/views/Routes/index.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/NotFound/index.vue'),
	},
	{
		path: '/not-permissions',
		name: 'NotPermissions',
		component: () => import('@/views/NotPermissions/index.vue'),
	},
];

const router = createRouter({
	//   history: createWebHashHistory(import.meta.env.BASE_URL),
	history: createWebHashHistory(),
	routes,
});

NProgress.configure({
	showSpinner: false, // 不显示右上角的 loading 圈
	easing: 'ease',
	speed: 500,
});

router.beforeEach((to, _from, next) => {
	NProgress.start();
	document.title = (to.meta.title as string) || '易Link-多渠道智能客服';
	next();
});

router.afterEach(() => {
	NProgress.done();
});

router.onError(() => {
	NProgress.done();
});

export default router;
