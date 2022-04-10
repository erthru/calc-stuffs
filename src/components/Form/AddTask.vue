<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits(["success"]);
const label = ref("");
const cost = ref("");
const isTaskExist = ref(false);
const isLoading = ref(false);
const activityStore = useActivityStore();
const route = useRoute();

const submit = async (e: Event) => {
    e.preventDefault();

    try {
        isTaskExist.value = false;
        isLoading.value = true;

        await activityStore.addTask(
            route.params.id as string,
            label.value,
            Number(cost.value)
        );

        await activityStore.fetchById(route.params.id as string);
        emit("success");
    } catch (error) {
        isTaskExist.value = true;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit="submit">
        <CSTextField
            v-model="label"
            label="Label"
            placeholder="ex: Snacking"
            required
        />

        <CSTextField
            v-model="cost"
            type="number"
            label="Cost"
            class="mt-16px"
            placeholder="50000"
            required
        />

        <CSAlert
            v-if="isTaskExist"
            color="text-white bg-red-500"
            message="Task Exist"
            class="mt-16px"
        />

        <CSButton
            type="submit"
            color="text-white bg-green-500"
            class="w-full mt-16px"
            :loading="isLoading"
            :disabled="!label || !cost"
            >Submit</CSButton
        >
    </form>
</template>
