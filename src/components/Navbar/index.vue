<script lang="ts" setup>
import { ref, type PropType } from "vue";

const isOptionsShown = ref(false);
const options = ref<HTMLDivElement>();
const emit = defineEmits(["optionSelected"]);

const props = defineProps({
    title: String,
    options: Object as PropType<string[]>,
});

const dismissOptions = () => {
    setTimeout(() => {
        isOptionsShown.value = false;
    }, 150);
};

const showOptions = () => {
    isOptionsShown.value = true;

    setTimeout(() => {
        options.value?.focus();
    }, 150);
};

const onOptionSelected = (index: number) => {
    emit("optionSelected", index);
    dismissOptions();
};
</script>

<template>
    <div class="bg-red-500 px-16px py-14px flex w-full shadow-lg items-center">
        <p class="text-white font-700 text-[18px]">{{ props.title }}</p>

        <div v-if="props.options?.length!! > 0" class="ml-auto relative">
            <IconEllipsisVertical
                class="w-20px h-20px cursor-pointer text-white"
                @click="showOptions"
            />

            <div
                v-if="isOptionsShown"
                ref="options"
                class="bg-white rounded absolute p-16px space-y-10px right-0 shadow"
                tabindex="0"
                @blur="dismissOptions"
            >
                <p
                    v-for="(option, i) in props.options"
                    :key="`option-${i}`"
                    class="text-gray-800 whitespace-nowrap cursor-pointer"
                    @click="onOptionSelected(i)"
                >
                    {{ option }}
                </p>
            </div>
        </div>
    </div>
</template>
