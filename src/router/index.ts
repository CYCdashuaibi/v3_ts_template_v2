import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound/index.vue'),
    }
];

const router = createRouter({
    //   history: createWebHashHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes,
});

// 全局前置守卫：可以做登录拦截、动态设置标题等
router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string || '易Link-多渠道智能客服';
    next();
});

export default router;
