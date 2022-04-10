<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const activityStore = useActivityStore();
const router = useRouter();
const isAddModalShown = ref(false);

onMounted(async () => {
    await activityStore.fetchAllByUserId(userStore.user?.id!!);
});

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

    <div class="py-16px flex w-full flex-col">
        <IconCircleNotch
            v-if="activityStore.isLoading"
            class="w-24px h-24px animate-spin text-green-500 mx-auto"
        />

        <ListActivities v-if="!activityStore.isLoading" />

        <p
            v-if="!activityStore.isLoading"
            class="text-green-500 font-500 w-full text-center text-14px cursor-pointer"
            :class="[
                activityStore.activitiesByUserId.length === 0
                    ? 'mt-4px'
                    : 'mt-16px',
            ]"
            @click="isAddModalShown = true"
        >
            Add New Activity
        </p>
    </div>

    <CSModal
        v-model="isAddModalShown"
        title="Add New Activity"
        subtitle="Fill the form below to add new activity"
    >
        <FormAddActivity @success="isAddModalShown = false" />
    </CSModal>
</template>
