<script setup lang="ts">
import AuthButton from "../auth-button.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<template>
  <div class="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300/40 px-4 md:px-6 transition-all duration-200">
    <div class="navbar-start">
      <NuxtLink
        to="/"
        class="btn btn-ghost text-xl font-bold tracking-tight rounded-xl px-3 hover:bg-base-200/60 transition-colors text-base-content"
      >
        <span class="text-primary">travel</span>Log
      </NuxtLink>
    </div>

    <div class="navbar-end flex flex-row items-center gap-5">
      <ThemeToggle />
      <AuthButton>Sign In</AuthButton>
    </div>
  </div>
</template>
