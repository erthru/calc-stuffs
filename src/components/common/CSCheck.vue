<script lang="ts" setup>
const props = defineProps({
    modelValue: Boolean,
    label: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <div
        class="flex items-center cursor-pointer"
        style="max-width: max-content"
        @click="emit('update:modelValue', !props.modelValue)"
    >
        <div
            class="border-1px border-gray-200 rounded h-18px w-18px bg-gray-100 flex items-center justify-center"
        >
            <IconCheck
                class="w-14px h-14px"
                :class="[props.modelValue ? 'text-gray-800' : 'text-gray-100']"
            />
        </div>

        <p class="ml-12px text-14px text-gray-800">
            {{ props.label }}
        </p>
    </div>
</template>
