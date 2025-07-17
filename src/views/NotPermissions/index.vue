<template>
	<div class="not-permissions">
        <img src="@/assets/images/not_permissions.svg" alt="" />
        <div class="not-permissions_text">暂无权限</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.not-permissions {
	width: 100%;
	height: 100%;
	@include flex-center(column);

	img {
		object-fit: contain;
		width: 400px;
	}
    
    .not-permissions_text {
        margin: $margin-base;
        color: $gray-dark;
        font-size: 22px;
    }
}
</style>
