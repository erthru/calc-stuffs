<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const activityStore = useActivityStore();
const router = useRouter();
const isAddModalShown = ref(false);
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await activityStore.fetchAllByUserId(userStore.user?.id!!);
    isLoading.value = false;
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

    <div class="flex w-full flex-col">
        <IconCircleNotch
            v-if="isLoading"
            class="w-24px h-24px animate-spin text-green-500 mx-auto mt-16px"
        />

        <ListActivities v-if="!isLoading" />

        <p
            v-if="!isLoading"
            class="text-green-500 font-500 w-full text-center text-14px cursor-pointer bg-white sticky bottom-0"
            :class="[
                activityStore.activitiesByUserId.length === 0
                    ? 'mt-4px'
                    : 'py-16px border-t-1px border-gray-200',
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
