<script setup lang="ts">
import AuthButton from "../auth-button.vue";
import ThemeToggle from "./ThemeToggle.vue";

const route = useRoute();
const isDashboard = computed(() => route.path.startsWith("/dashboard"));
</script>

<template>
  <div
    v-if="!isDashboard"
    class="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur-sm border-b border-base-300 px-4 md:px-6"
  >
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-lg font-semibold px-2">
        <span class="text-primary">travel</span>Log
      </NuxtLink>
    </div>
    <div class="navbar-end flex items-center gap-3">
      <ThemeToggle />
      <AuthButton>Sign In</AuthButton>
    </div>
  </div>
</template>
