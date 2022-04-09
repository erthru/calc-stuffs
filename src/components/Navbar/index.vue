<script lang="ts" setup>
const props = defineProps({
    title: String,
});
</script>

<template>
    <div class="bg-red-500 p-[16px] flex w-full shadow-lg">
        <p class="text-white font-700 text-[18px]">{{ props.title }}</p>
    </div>
</template>
