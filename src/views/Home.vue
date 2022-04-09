<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
    await userStore.logout();
    router.push("/login");
};
</script>

<template>
    <Navbar title="Home" class="sticky top-0" />

    <div class="p-16px">
        <p class="text-gray-700" @click="logout">hello world</p>
    </div>
</template>
