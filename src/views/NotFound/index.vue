<template>
    <div class="not-found_container">
        <img src="@/assets/images/not_found.png" alt="">
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.not-found_container {
    width: 100%;
    height: 100%;
    @include flex-center;

    img {
        object-fit: contain;
        width: 800px;
    }
}
</style>