<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <Navbar title="Register" class="sticky top-0" />

    <div class="p-16px">
        <FormRegister />

        <p class="mt-8px w-full text-center text-gray-800">
            Registered Already?
            <RouterLink to="/login" class="text-blue-500 font-500"
                >Login Here</RouterLink
            >
        </p>
    </div>
</template>
