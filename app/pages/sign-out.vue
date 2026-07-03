<script setup lang="ts">
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.signOut();
  navigateTo("/");
});
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-4 text-center">
    <!-- Spinner discret sans fioritures -->
    <span class="loading loading-spinner loading-md text-primary" />

    <!-- Message simple et moderne -->
    <div class="space-y-1">
      <h2 class="text-lg font-medium text-base-content">
        Déconnexion en cours...
      </h2>
      <p class="text-sm text-base-content/60">
        Merci de votre visite, à bientôt !
      </p>
    </div>
  </div>
</template>
