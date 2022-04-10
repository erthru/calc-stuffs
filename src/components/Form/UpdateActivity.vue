<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits(["success"]);
const name = ref("");
const isNameExist = ref(false);
const isLoading = ref(false);
const activityStore = useActivityStore();
const userStore = useUserStore();
const route = useRoute();

onMounted(() => {
    name.value = activityStore.activityById.name;
});

const submit = async (e: Event) => {
    e.preventDefault();

    try {
        isNameExist.value = false;
        isLoading.value = true;
        
        await activityStore.update(
            route.params.id as string,
            name.value,
            userStore.user?.id!!
        );

        await activityStore.fetchById(route.params.id as string);
        emit("success");
    } catch (error) {
        isNameExist.value = true;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit="submit">
        <CSTextField
            v-model="name"
            label="Name"
            placeholder="ex: Bill Aug"
            required
        />

        <CSAlert
            v-if="isNameExist"
            color="text-white bg-red-500"
            message="Name Exist"
            class="mt-16px"
        />

        <CSButton
            type="submit"
            color="text-white bg-green-500"
            class="w-full mt-16px"
            :loading="isLoading"
            :disabled="!name"
            >Submit</CSButton
        >
    </form>
</template>
