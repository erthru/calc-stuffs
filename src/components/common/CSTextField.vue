<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: String,
    label: String,
    type: String,
    placeholder: String,
    disabled: Boolean,
    required: Boolean,
});

const onInput = (e: Event) => {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
    <div>
        <p class="text-14px font-500 text-gray-500">{{ props.label }}</p>

        <input
            class="mt-8px rounded border-1px border-gray-200 w-full px-16px py-9px focus:outline-none text-gray-800"
            :class="[props.disabled ? 'bg-gray-300' : 'bg-gray-100']"
            :value="props.modelValue"
            :type="props.type"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :required="props.required"
            @input="onInput"
        />
    </div>
</template>
