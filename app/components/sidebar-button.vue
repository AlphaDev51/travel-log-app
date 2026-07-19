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
    class="w-full text-xs tooltip-right"
    :data-tip="props.showLabel ? undefined : props.label"
    :class="{ tooltip: !props.showLabel }"
  >
    <nuxt-link
      :to="props.href"
      class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors"
      :class="[
        route.path === props.href
          ? 'bg-base-200 text-base-content font-medium'
          : 'text-base-content/60 hover:bg-base-200/60 hover:text-base-content',
        props.showLabel ? 'justify-start' : 'justify-center',
      ]"
    >
      <Icon :name="props.icon" size="18" class="shrink-0" />
      <span v-if="props.showLabel" class="text-sm truncate ">
        {{ props.label }}
      </span>
    </nuxt-link>
  </div>
</template>
