<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";
import { RouterLink } from "vue-router";

const activityStore = useActivityStore();
const userStore = useUserStore();

const _delete = async (id: string) => {
    await activityStore.delete(id);
    await activityStore.fetchAllByUserId(userStore.user?.id!!);
};
</script>

<template>
    <p
        v-if="activityStore.activitiesByUserId.length === 0"
        class="text-14px w-full text-center text-gray-700 leading-22px"
    >
        Activities Empty.
    </p>

    <div v-else>
        <div
            v-for="(activity, i) in activityStore.activitiesByUserId"
            :key="`activity-${i}`"
            class="pb-16px px-16px cursor-pointer flex w-full items-center border-b-1px border-gray-200"
            :class="{ 'mt-16px': i > 0 }"
        >
            <RouterLink
                :to="`/activity/${activity.id}`"
                class="w-full flex-1 pr-16px"
            >
                <p class="font-500 text-gray-800">{{ activity.name }}</p>

                <p class="text-gray-500 text-12px mt-2px">
                    {{ activity.tasks ? activity.tasks.length : 0 }} tasks
                </p>
            </RouterLink>

            <IconTrash
                class="w-18px h-18px text-red-500"
                @click="_delete(activity.id)"
            />
        </div>
    </div>
</template>
