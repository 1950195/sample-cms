<template>
    <header class="navbar navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a href="#" class="navbar-brand">{{title}}</a>
            </div>
            <nav class="navbar-collapse" role="navigation">
                <top-menu></top-menu>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#" class="menu-item">Sign In</a></li>
                    <li><a href="#" class="menu-item">Sign Up</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
    import TopMenu from './top-menu.vue';

    export default {
        data () {
            return {
                title: 'CMS'
            }
        },
        components: {
            TopMenu
        }
    }
</script>

