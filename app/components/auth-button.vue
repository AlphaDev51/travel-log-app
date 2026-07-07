<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <!-- Menu Utilisateur Connecté -->
  <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end">
    <!-- Bouton profil épuré -->
    <div
      tabindex="0"
      role="button"
      class="btn btn-ghost hover:bg-base-200/60正常 normal-case flex items-center gap-2.5 px-3 rounded-xl transition-all duration-200"
    >
      <div v-if="authStore.user.image" class="avatar">
        <div class="w-7 rounded-full ring-2 ring-primary/20 ring-offset-base-100 ring-offset-1">
          <img :src="authStore.user.image" :alt="authStore.user.name">
        </div>
      </div>
      <span class="text-sm font-medium text-base-content/90">{{ authStore.user.name }}</span>
    </div>

    <!-- Dropdown menu stylisé -->
    <ul
      tabindex="-1"
      class="dropdown-content menu bg-base-200/95 backdrop-blur-md rounded-xl z-50 w-52 p-1.5 mt-2 shadow-xl border border-base-300/50"
    >
      <li>
        <NuxtLink
          to="/signout"
          class="flex items-center justify-between text-error hover:bg-error/10 active:bg-error/20 px-3 py-2.5 rounded-lg transition-colors group"
        >
          <span class="font-medium text-sm">Log Out</span>
          <Icon
            name="tabler:logout"
            size="18"
            class="opacity-70 group-hover:translate-x-0.5 transition-transform duration-200"
          />
        </NuxtLink>
      </li>
    </ul>
  </div>

  <!-- Bouton de Connexion / Loading -->
  <button
    v-else
    :disabled="authStore.loading"
    class="btn btn-accent px-5 font-medium rounded-xl shadow-md
     shadow-accent/10 hover:shadow-lg hover:shadow-accent/20 active:scale-95
     transition-all duration-200"
    @click="authStore.signIn()"
  >
    <!-- Effet de pulsation fluide sur le chargement -->
    <span
      v-if="authStore.loading" class="loading loading-spinner
    loading-md text-accent-content/70 animate-spin"
    />    <!-- Contenu normal centré -->
    <span v-else class="flex items-center gap-2">
      <slot />
      <Icon name="tabler:brand-github" size="20" />
    </span>
  </button>
</template>
