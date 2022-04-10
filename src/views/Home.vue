<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
    await userStore.logout();
    router.push("/login");
};

const onOptionSelected = (index: number) => {
    switch (index) {
        case 0:
            break;

        case 1:
            logout();
            break;
    }
};
</script>

<template>
    <Navbar
        title="Home"
        class="sticky top-0"
        :options="['Change Password', 'Logout']"
        @option-selected="onOptionSelected"
    />

    <div class="p-16px">
        <p class="text-gray-700" @click="logout">hello world</p>
    </div>
</template>
