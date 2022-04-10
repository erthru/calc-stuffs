<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { useRoute } from "vue-router";
import { ref } from "vue";

const activityStore = useActivityStore();
const route = useRoute();
const isUpdateModalShown = ref(false);
const selectedIndex = ref(0);

const _delete = async (label: string) => {
    await activityStore.deleteTask(route.params.id as string, label);
    await activityStore.fetchById(route.params.id as string);
};
</script>

<template>
    <div>
        <div
            v-for="(task, i) in activityStore.activityById.tasks"
            :key="`activity-${i}`"
            class="pb-16px px-16px flex w-full items-center border-b-1px border-gray-200 cursor-pointer mt-16px"
        >
            <div
                class="w-full flex-1 pr-16px"
                @click="
                    () => {
                        isUpdateModalShown = true;
                        selectedIndex = i;
                    }
                "
            >
                <p class="font-500 text-gray-800">{{ task.label }}</p>

                <p class="text-gray-500 text-12px mt-2px">
                    {{ task.cost.toLocaleString() }}
                </p>
            </div>

            <IconTrash
                class="w-18px h-18px text-red-500"
                @click="_delete(task.label)"
            />
        </div>
    </div>

    <CSModal
        v-model="isUpdateModalShown"
        title="Update Task"
        subtitle="Update the form below"
    >
        <FormUpdateTask
            :index="selectedIndex"
            @success="isUpdateModalShown = false"
        />
    </CSModal>
</template>
