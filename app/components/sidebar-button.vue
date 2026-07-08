<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();
const route = useRoute();
</script>

<template>
  <div
    class="w-full tooltip-info tooltip-right text-xs"
    :data-tip="props.showLabel ? undefined : props.label"
    :class="{ tooltip: !props.showLabel }"
  >
    <nuxt-link
      :to="props.href"
      class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-200 group"
      :class="[
        route.path === props.href
          ? 'bg-base-300 text-base-content font-semibold'
          : 'text-base-content/70 hover:bg-base-300/40 hover:text-base-content',
        props.showLabel ? 'justify-start' : 'justify-center',
      ]"
    >
      <Icon
        :name="props.icon"
        size="22"
        class="transition-transform duration-200 group-hover:scale-105 shrink-0"
      />

      <transition name="grow">
        <span v-if="props.showLabel" class="text-sm tracking-wide overflow-hidden text-ellipsis whitespace-nowrap">
          {{ props.label }}
        </span>
      </transition>
    </nuxt-link>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.1s;
}
.grow-leave-active {
  animation: grow 0.1s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
