<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const isLoginError = ref(false);

const submit = async (e: Event) => {
    e.preventDefault();

    try {
        isLoading.value = true;
        isLoginError.value = false;
        await userStore.login(email.value, password.value);
        router.push("/");
    } catch (error) {
        isLoginError.value = true;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit="submit">
        <CSTextField
            v-model="email"
            type="email"
            label="Email"
            placeholder="ex: someone@mail.com"
            required
        />

        <CSTextField
            v-model="password"
            type="password"
            label="Password"
            class="mt-16px"
            placeholder="*******"
            required
        />

        <CSAlert
            v-if="isLoginError"
            class="mt-16px"
            message="Login Failed."
            color="text-white bg-red-500"
        />

        <CSButton
            type="submit"
            class="mt-16px w-full"
            color="bg-green-500 text-white"
            :loading="isLoading"
            :disabled="!email || !password"
            >Submit</CSButton
        >
    </form>
</template>
