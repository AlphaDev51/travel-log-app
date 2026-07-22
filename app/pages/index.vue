<script setup lang="ts">
import AuthButton from "~/components/auth-button.vue";

const authStore = useAuthStore();
</script>

<template>
  <div class="relative min-h-[85vh] flex items-center px-6 md:px-12 overflow-hidden">
    <!-- Aurora mesh : un seul fond composite, fixed, jamais coupé -->
    <div class="aurora-bg" />

    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full relative z-10">
      <!-- Texte -->
      <div class="space-y-6 text-center md:text-left">
        <div class="space-y-3">
          <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-base-content">
            Keep track of<br>every place that matters
          </h1>
          <p class="text-base-content/60 leading-relaxed max-w-md mx-auto md:mx-0">
            A simple, focused log for the places you visit. Pin locations,
            add notes, and see everything on one map.
          </p>
        </div>

        <div class="flex justify-center md:justify-start">
          <AuthButton v-if="!authStore.user">
            Sign In With Github
          </AuthButton>

          <NuxtLink
            v-else
            to="/dashboard"
            class="btn btn-neutral gap-2"
          >
            Go to Dashboard
            <Icon name="tabler:arrow-right" size="16" />
          </NuxtLink>
        </div>

        <div class="flex items-center gap-6 justify-center md:justify-start pt-2 text-xs text-base-content/40">
          <span class="flex items-center gap-1.5">
            <Icon name="tabler:map-pin" size="14" />
            Save any location
          </span>
          <span class="flex items-center gap-1.5">
            <Icon name="tabler:lock" size="14" />
            Private by default
          </span>
        </div>
      </div>

      <!-- Aperçu produit avec profondeur (carte flottante derrière) -->
      <div class="hidden md:block relative">
        <!-- Carte fantôme en arrière-plan pour l'effet de profondeur -->
        <div class="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-base-300/60 bg-base-200/40" />

        <div class="relative rounded-xl border border-base-300 bg-base-200 overflow-hidden shadow-lg">
          <div class="h-8 bg-base-100 border-b border-base-300 flex items-center gap-1.5 px-3">
            <div class="w-2.5 h-2.5 rounded-full bg-base-300" />
            <div class="w-2.5 h-2.5 rounded-full bg-base-300" />
            <div class="w-2.5 h-2.5 rounded-full bg-base-300" />
          </div>
          <div class="flex h-64">
            <div class="w-24 border-r border-base-300 bg-base-100 p-2 space-y-1.5">
              <div class="h-2 w-14 bg-base-300 rounded" />
              <div class="h-2 w-16 bg-base-300 rounded" />
              <div class="h-2 w-12 bg-base-300 rounded" />
            </div>
            <div class="flex-1 relative bg-[#e8e6df] overflow-hidden">
              <Icon
                name="tabler:map-pin-filled"
                size="18"
                class="absolute top-8 left-10 text-primary drop-shadow-sm"
              />
              <Icon
                name="tabler:map-pin-filled"
                size="18"
                class="absolute top-20 left-24 text-primary drop-shadow-sm"
              />
              <Icon
                name="tabler:map-pin-filled"
                size="18"
                class="absolute top-32 left-14 text-primary drop-shadow-sm"
              />
              <Icon
                name="tabler:map-pin-filled"
                size="18"
                class="absolute top-14 left-32 text-primary drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aurora-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    radial-gradient(circle at 15% 20%, rgb(99 102 241 / 10%), transparent 35%),
    radial-gradient(circle at 85% 10%, rgb(251 146 60 / 10%), transparent 35%),
    radial-gradient(circle at 75% 80%, rgb(56 189 248 / 8%), transparent 35%),
    radial-gradient(circle at 10% 90%, rgb(217 70 239 / 6%), transparent 30%);
  filter: blur(40px);
}

:global([data-theme="dark"]) .aurora-bg {
  background-image:
    radial-gradient(circle at 15% 20%, rgb(99 102 241 / 18%), transparent 35%),
    radial-gradient(circle at 85% 10%, rgb(251 146 60 / 14%), transparent 35%),
    radial-gradient(circle at 75% 80%, rgb(56 189 248 / 14%), transparent 35%),
    radial-gradient(circle at 10% 90%, rgb(217 70 239 / 10%), transparent 30%);
}
</style>
