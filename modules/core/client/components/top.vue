<template>
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a href="#" class="navbar-brand">{{title}}</a>
            </div>
            <div class="navbar-container" aria-expanded="false">
                <top-menu></top-menu>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#" class="menu-item">Sign In</a></li>
                    <li><a href="#" class="menu-item">Sign Up</a></li>
                </ul>
            </div>
        </div>
    </nav>
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

