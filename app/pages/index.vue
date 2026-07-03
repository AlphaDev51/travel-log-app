<script setup lang="ts">
import AuthButton from "~/components/auth-button.vue";

const authStore = useAuthStore();
</script>

<template>
  <!-- Conteneur principal épuré avec des effets de lumière discrets en fond -->
  <div class="relative min-h-[75vh] flex items-center justify-center overflow-hidden px-4">
    <!-- Effet de halo lumineux en arrière-plan (Design Skill: Depth) -->
    <div class="absolute inset-0 -z-10 flex items-center justify-center">
      <div class="w-100 h-100 bg-primary/10 rounded-full blur-[120px] absolute -translate-y-12" />
      <div class="w-75 h-[75 bg-accent/5 rounded-full blur-[100px] absolute translate-x-20 translate-y-10" />
    </div>

    <!-- Contenu central -->
    <div class="max-w-2xl text-center space-y-8 py-12">
      <!-- Titre avec dégradé moderne (Design Skill: Contrast & Typography) -->
      <div class="space-y-3">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-base-content via-primary to-accent bg-clip-text text-transparent">
          Travel Log
        </h1>
        <!-- Une petite ligne de séparation élégante -->
        <div class="w-12 h-1 bg-linear-to-r from-primary to-accent rounded-full mx-auto" />
      </div>

      <!-- Description plus aérée (Design Skill: Readability) -->
      <p class="text-base md:text-lg text-base-content/70 font-normal leading-relaxed max-w-xl mx-auto">
        A clean space to save your favorite locations, photos,
        and the raw moments that define your adventures around the world.
      </p>

      <!-- Section Actions -->
      <div class="pt-2 flex justify-center items-center">
        <AuthButton v-if="!authStore.user">
          Sign In With Github
        </AuthButton>

        <NuxtLink
          v-else
          to="/dashboard"
          class="btn btn-accent px-6 h-12 min-h-12 text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 gap-2"
        >
          <span>Go to Dashboard</span>
          <Icon name="tabler:arrow-right" size="18" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
