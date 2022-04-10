<script lang="ts" setup>
const props = defineProps({
    modelValue: Boolean,
    title: String,
    subtitle: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <div v-if="props.modelValue" class="relative">
        <div
            class="bg-black w-full max-w-640px bg-opacity-50 min-h-screen fixed z-2 top-0"
            @click="emit('update:modelValue', false)"
        />

        <div class="z-3 fixed top-0 w-full max-w-640px py-16px px-16px">
            <div class="bg-white rounded shadow py-16px">
                <div class="px-16px border-b-1px border-gray-200 pb-16px">
                    <p class="font-700 text-gray-800">{{ props.title }}</p>

                    <p class="text-14px mt-2px text-gray-500">
                        {{ props.subtitle }}
                    </p>
                </div>

                <div class="px-16px mt-16px">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
