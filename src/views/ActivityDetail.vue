<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const router = useRouter();
const activityStore = useActivityStore();
const userStore = useUserStore();
const isLoading = ref(false);
const isUpdateModalShown = ref(false);

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
</script>

<template>
    <Navbar
        title="Activity Detail"
        class="sticky top-0"
        :options="['Change Password', 'Logout']"
        @option-selected="onOptionSelected"
    />

    <div class="py-16px flex w-full flex-col">
        <IconCircleNotch
            v-if="isLoading"
            class="w-24px h-24px animate-spin text-green-500 mx-auto"
        />

        <div v-if="!isLoading" class="flex w-full items-center px-16px">
            <div class="w-full flex-1 pr-16px">
                <p class="font-500 text-gray-800">
                    {{ activityStore.activityById.name }}
                </p>

                <p class="text-gray-500 text-12px mt-2px">
                    {{
                        activityStore.activityById.tasks
                            ? activityStore.activityById.tasks.length
                            : 0
                    }}
                    tasks
                </p>
            </div>

            <IconPenToSquare
                class="w-18px h-18px text-yellow-500 cursor-pointer"
                @click="isUpdateModalShown = true"
            />
        </div>
    </div>

    <CSModal
        v-model="isUpdateModalShown"
        title="Update Activity"
        subtitle="Update the form below"
    >
        <FormUpdateActivity @success="isUpdateModalShown = false" />
    </CSModal>
</template>
