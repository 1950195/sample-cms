<template>
    <top></top>
    <section class="content">
        <router-view class="view" keep-alive></router-view>
    </section>
</template>

<script>
    import Top from './top.vue';

    export default {
        components: {
            Top
        }
    }
</script>

<style lang="scss">
    .content {
        margin-top: 50px;
    }
</style>
