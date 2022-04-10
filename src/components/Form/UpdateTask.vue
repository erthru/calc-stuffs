<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
    index: Number,
});

const emit = defineEmits(["success"]);
const label = ref("");
const cost = ref("");
const isCheck = ref(false);
const isLoading = ref(false);
const activityStore = useActivityStore();
const route = useRoute();

onMounted(() => {
    label.value = activityStore.activityById.tasks[props.index!!].label;

    cost.value =
        activityStore.activityById.tasks[props.index!!].cost.toString();

    isCheck.value = activityStore.activityById.tasks[props.index!!].isCheck;
});

const submit = async (e: Event) => {
    e.preventDefault();

    isLoading.value = true;

    await activityStore.updateTask(
        route.params.id as string,
        props.index!!,
        Number(cost.value),
        isCheck.value
    );

    await activityStore.fetchById(route.params.id as string);
    isLoading.value = false;
    emit("success");
};
</script>

<template>
    <form @submit="submit">
        <CSTextField
            v-model="label"
            label="Label"
            placeholder="ex: Snacking"
            required
            disabled
        />

        <CSTextField
            v-model="cost"
            type="number"
            label="Cost"
            class="mt-16px"
            placeholder="50000"
            required
        />

        <CSCheck v-model="isCheck" label="Done?" class="mt-16px" />

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
