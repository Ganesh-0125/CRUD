<template>
    <div class="flex items-center justify-center min-h-screen w-screen bg-cyan-900 overflow-hidden px-4">
        <div class="grid w-[80%] max-w-6xl gap-6 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
            <Left />
            <Right />
        </div>
    </div>
</template>

<script>
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";

export default {
    components: { Left, Right }
};
</script>
