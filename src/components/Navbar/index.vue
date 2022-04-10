<script lang="ts" setup>
import { ref, type PropType } from "vue";
import { RouterLink } from "vue-router";

const isOptionsShown = ref(false);
const options = ref<HTMLDivElement>();
const emit = defineEmits(["optionSelected"]);

const props = defineProps({
    title: String,
    options: Object as PropType<string[]>,
    backTo: String,
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
    <div
        class="bg-red-500 px-16px py-14px flex w-full shadow-lg items-center z-1"
    >
        <RouterLink v-if="props.backTo" :to="props.backTo">
            <IconAngleLeft class="w-20px h-20px mt-6px cursor-pointer text-white" />
        </RouterLink>

        <p
            class="text-white font-700 text-[18px]"
            :class="{ 'ml-16px': props.backTo }"
        >
            {{ props.title }}
        </p>

        <div v-if="props.options?.length!! > 0" class="ml-auto relative">
            <IconEllipsisVertical
                class="w-20px h-20px cursor-pointer text-white"
                @click="showOptions"
            />

            <div
                v-if="isOptionsShown"
                ref="options"
                class="bg-white rounded absolute pt-16px space-y-10px right-0 shadow focus:outline-none"
                tabindex="0"
                @blur="dismissOptions"
            >
                <div
                    v-for="(option, i) in props.options"
                    :key="`option-${i}`"
                    class="cursor-pointer px-16px pb-16px"
                    :class="{
                        'border-b-1px border-gray-200':
                            i !== props.options?.length!! - 1,
                    }"
                    @click="onOptionSelected(i)"
                >
                    <p class="text-gray-800 whitespace-nowrap">
                        {{ option }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
