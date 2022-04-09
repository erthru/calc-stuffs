<script lang="ts" setup>
const props = defineProps({
    message: String,
    color: String,
});
</script>

<template>
    <div
        class="rounded px-16px py-10px w-full flex items-center"
        :class="[props.color]"
    >
        <IconCircleInfo class="w-18px h-18px" />
        <p class="font-500 ml-12px text-14px">{{ props.message }}</p>
    </div>
</template>
