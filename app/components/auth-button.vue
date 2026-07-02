<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <button
    :disabled="authStore.loading" class="btn btn-accent"
    @click="!authStore.loading && authStore.signIn()"
  >
    <span v-if="authStore.loading" class="loading loading-dots loading-md animate-pulse" />
    <span v-else>
      <slot />
      <Icon name="tabler:brand-github" size="24" />
    </span>
  </button>
</template>
