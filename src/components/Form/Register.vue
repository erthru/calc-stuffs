<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const isLoading = ref(false);
const isRegisterFailed = ref(false);
const isPasswordConfirmationNotMatch = ref(false);

const submit = async (e: Event) => {
    e.preventDefault();

    try {
        isLoading.value = true;
        isRegisterFailed.value = false;
        isPasswordConfirmationNotMatch.value = false;

        if (password.value !== passwordConfirmation.value)
            isPasswordConfirmationNotMatch.value = true;
        else {
            await userStore.register(email.value, password.value);
            router.push("/");
        }
    } catch (error) {
        isRegisterFailed.value = true;
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

        <CSTextField
            v-model="passwordConfirmation"
            type="password"
            label="Password Confirmation"
            class="mt-16px"
            placeholder="*******"
            required
        />

        <CSAlert
            v-if="isRegisterFailed"
            class="mt-16px"
            message="Register Failed, The Email Maybe Used."
            color="text-white bg-red-500"
        />

        <CSAlert
            v-if="isPasswordConfirmationNotMatch"
            class="mt-16px"
            message="Register Failed, Password Confirmation Not Match"
            color="text-white bg-red-500"
        />

        <CSButton
            type="submit"
            class="mt-16px w-full"
            color="bg-green-500 text-white"
            :loading="isLoading"
            :disabled="!email || !password || !passwordConfirmation"
            >Submit</CSButton
        >
    </form>
</template>
