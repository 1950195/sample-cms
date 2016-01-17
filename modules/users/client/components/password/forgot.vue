<template>
    <h3 class="col-md-12 text-center">Restore your password</h3>
    <p class="small text-center">Enter your account username.</p>
    <div class="col-md-12">
        <form name="forgotPasswordForm" class="form-horizontal" autocomplete="off" @submit.prevent>
            <fieldset>
                <div class="form-group">
                    <input type="text" id="username" name="username" class="form-control" placeholder="Username">
                </div>
                <div class="text-center form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </fieldset>
        </form>
    </div>
</template>
