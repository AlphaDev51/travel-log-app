<script setup lang="ts">
const route = useRoute();
const error = route.query.error || "an unknown error occured";
</script>

<template>
  <div class="card bg-base-200 border border-base-300 shadow-xl max-w-2xl mt-12 p-8 text-center mx-auto flex flex-col justify-center items-center gap-6">
    <div class="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center animate-pulse">
      <Icon name="tabler:alert-triangle" size="36" />
    </div>

    <div class="space-y-3 w-full max-w-md">
      <h2 class="text-xl font-bold text-base-content tracking-tight">
        Oh no!
      </h2>
      <p class="text-xs font-mono bg-base-300 px-4 py-2.5 rounded-lg text-error border border-error/10 break-all">
        {{ error }}
      </p>
    </div>

    <div class="divider w-full opacity-40 my-0" />

    <nuxt-link to="/" class="btn btn-primary btn-wide gap-2 shadow-lg hover:scale-105 duration-200">
      <Icon name="tabler:arrow-left" size="20" />
      <span>home</span>
    </nuxt-link>
  </div>
</template>
