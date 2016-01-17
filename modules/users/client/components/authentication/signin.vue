<template>
    <h3 class="col-md-12 text-center">Or with your account</h3>
    <div class="col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
        <form name="userForm" class="signin" autocomplete="off" @submit.prevent>
            <fieldset>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" class="form-control" placeholder="Username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password">
                </div>
                <div class="text-center form-group">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                    &nbsp; or&nbsp;
                    <a v-link="{ path: '/signup' }">Sign up</a>
                </div>
                <div class="text-center forgot-password">
                    <a v-link="{ path: '/password/forgot' }">Forgot your password?</a>
                </div>
            </fieldset>
        </form>
    </div>
</template>
