<template>
	<div class="routes">
		<div class="routes-item" v-for="route in routes" :key="route.path">
			<router-link :to="route.path">{{ route.meta?.title ? `${route.meta?.title} -- `: '' }}{{ route.path }}</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '@/router';

const filterRoute = ['/', '/routes', '/:pathMatch(.*)*', '/not-permissions'];

const routes = router.options.routes.filter(
	(item) => !filterRoute.includes(item.path),
);
</script>

<style scoped lang="scss">
.routes {
    padding: 20px;

    .routes-item {
        @include link-status();
        padding: 5px 0;
    }
}
</style>
