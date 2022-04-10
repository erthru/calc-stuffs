<script setup lang="ts">
const emit = defineEmits(["click"]);

const props = defineProps({
    type: String,
    disabled: Boolean,
    color: String,
    loading: Boolean,
    circle: Boolean,
});

const onClick = () => {
    if (!props.disabled && !props.loading) emit("click");
};
</script>

<template>
    <button
        class="px-16px flex items-center justify-center"
        :class="[
            props.disabled ? 'text-gray-100 bg-gray-600' : props.color,
            circle ? 'rounded-full py-16px' : 'rounded py-10px',
        ]"
        :disabled="props.disabled"
        @click="onClick"
    >
        <IconCircleNotch
            v-if="props.loading"
            class="w-24px h-24px animate-spin text-white"
        />
        <slot v-else />
    </button>
</template>
