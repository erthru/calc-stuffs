<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <Navbar title="Login" class="sticky top-0" />

    <div class="p-16px">
        <FormLogin />

        <p class="mt-8px w-full text-center text-gray-800">
            Don't Have Account?
            <RouterLink to="/register" class="text-blue-500 font-500"
                >Register Here</RouterLink
            >
        </p>
    </div>
</template>
