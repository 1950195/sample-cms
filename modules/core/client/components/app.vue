<template>
    <top></top>
    <section class="content">
        <section class="container">
            <router-view class="view"></router-view>
        </section>
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
