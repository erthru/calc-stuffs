<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const router = useRouter();
const activityStore = useActivityStore();
const userStore = useUserStore();
const isLoading = ref(false);
const isUpdateModalShown = ref(false);
const isAddTaskModalShown = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await activityStore.fetchById(route.params.id as string);
    isLoading.value = false;
});

const onOptionSelected = (index: number) => {
    switch (index) {
        case 0:
            break;

        case 1:
            logout();
            break;
    }
};

const logout = async () => {
    await userStore.logout();
    router.push("/login");
};

const total = computed(() => {
    let totalTemp = 0;

    if (activityStore.activityById.tasks) {
        activityStore.activityById.tasks.forEach((task) => {
            totalTemp += task.cost;
        });

        return totalTemp;
    }

    return 0;
});
</script>

<template>
    <Navbar
        title="Activity Detail"
        class="sticky top-0"
        :options="['Change Password', 'Logout']"
        back-to="/"
        @option-selected="onOptionSelected"
    />

    <div class="py-16px flex w-full flex-col">
        <IconCircleNotch
            v-if="isLoading"
            class="w-24px h-24px animate-spin text-green-500 mx-auto"
        />

        <div
            v-if="!isLoading"
            class="flex w-full items-center px-16px pb-16px border-b-1px border-gray-200"
        >
            <p class="font-500 w-full flex-1 text-gray-800">
                {{ activityStore.activityById.name }}
            </p>

            <IconPenToSquare
                class="w-18px h-18px text-yellow-500 cursor-pointer"
                @click="isUpdateModalShown = true"
            />
        </div>

        <ListTasks v-if="!isLoading" class="mt-16px" />

        <div
            v-if="
                !isLoading &&
                activityStore.activityById.tasks &&
                activityStore.activityById.tasks.length > 0
            "
            class="mt-16px pb-16px border-b-1px border-gray-200 px-16px"
        >
            <p class="font-500 text-gray-800">Total</p>

            <p class="text-gray-500 text-12px mt-2px">
                {{ total.toLocaleString() }}
            </p>
        </div>

        <p
            v-if="!isLoading"
            class="text-green-500 font-500 w-full text-center text-14px cursor-pointer mt-16px"
            @click="isAddTaskModalShown = true"
        >
            Add New Task
        </p>
    </div>

    <CSModal
        v-model="isUpdateModalShown"
        title="Update Activity"
        subtitle="Update the form below"
    >
        <FormUpdateActivity @success="isUpdateModalShown = false" />
    </CSModal>

    <CSModal
        v-model="isAddTaskModalShown"
        title="Add Task"
        subtitle="Fill the form below to add new task"
    >
        <FormAddTask @success="isAddTaskModalShown = false" />
    </CSModal>
</template>
