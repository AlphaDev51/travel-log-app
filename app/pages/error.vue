<script setup lang="ts">
const route = useRoute();
const error = route.query.error || "an unknown error occured";
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center">
    <div role="alert" class="alert alert-error min-w-1/2">
      <span>Oh no  {{ error }}</span>
      <nuxt-link to="/" class="btn btb-primary">
        home
        <Icon name="tabler:arrow-left" size="32" />
      </nuxt-link>
    </div>
  </div>
</template>
