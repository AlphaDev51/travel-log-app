<script setup lang="ts">
const route = useRoute();
const error = route.query.error || "an unknown error occurred";
</script>

<template>
  <div class="max-w-md mx-auto mt-16 px-4 text-center space-y-5">
    <Icon name="tabler:alert-triangle" size="28" class="text-error mx-auto" />

    <div class="space-y-2">
      <h2 class="text-lg font-semibold text-base-content">
        Something went wrong
      </h2>
      <p class="text-xs font-mono bg-base-200 px-3 py-2 rounded-md text-base-content/70 break-all">
        {{ error }}
      </p>
    </div>

    <NuxtLink to="/" class="btn btn-neutral btn-sm gap-2">
      <Icon name="tabler:arrow-left" size="16" />
      Home
    </NuxtLink>
  </div>
</template>
