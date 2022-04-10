<script lang="ts" setup>
import { useActivityStore } from "@/stores/activity";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const emit = defineEmits(["success"]);
const name = ref("");
const isNameExist = ref(false);
const isLoading = ref(false);
const activityStore = useActivityStore();
const userStore = useUserStore();

const submit = async (e: Event) => {
    e.preventDefault();

    try {
        isNameExist.value = false;
        isLoading.value = true;
        await activityStore.add(name.value, userStore.user?.id!!);
        await activityStore.fetchAllByUserId(userStore.user?.id!!);
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
