<template>
    <ul class="nav navbar-nav">
        <li>
            <a href="#" class="menu-item">Link</a>
        </li>
        <li class="dropdown">
            <a href="#" class="menu-item dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown<span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li><a role="menuitem" class="sub menu-item" href="#">Action</a></li>
                <li><a role="menuitem" class="sub menu-item" href="#">Another action</a></li>
                <li><a role="menuitem" class="sub menu-item" href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li><a role="menuitem" class="sub menu-item" href="#">Separated link</a></li>
                <li role="separator" class="divider"></li>
                <li><a role="menuitem" class="sub menu-item" href="#">One more separated link</a></li>
            </ul>
        </li>
    </ul>
</template>

<style lang="scss">
    .dropdown {
        &:hover {
            > .dropdown-menu {
                display: block;
            }
        }
    }
</style>
