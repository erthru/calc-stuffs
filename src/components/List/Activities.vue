<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";

const activityStore = useActivityStore();

const _delete = (id: string) => {};
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
        >
            <div class="w-full flex-1 pr-16px">
                <p class="font-500 text-gray-800">{{ activity.name }}</p>

                <p class="text-gray-500 text-12px mt-2px">
                    {{ activity.tasks.length }} tasks
                </p>
            </div>

            <IconTrash
                class="w-18px h-18px text-red-500"
                @click="_delete(activity.id)"
            />
        </div>
    </div>
</template>
