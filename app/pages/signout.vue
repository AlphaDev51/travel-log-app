<script setup lang="ts">
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.signOut();
});
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center px-4">
    <span v-if="authStore.loading" class="loading loading-spinner loading-sm text-base-content/40" />
    <p class="text-sm text-base-content/60">
      Signing you out…
    </p>
  </div>
</template>
