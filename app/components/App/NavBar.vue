<script setup lang="ts">
import AuthButton from "../auth-button.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        travelLog
      </NuxtLink>
    </div>
    <div class="navbar-end flex flex-row gap-8 items-baseline-last">
      <ThemeToggle />
      <AuthButton>Sign In</AuthButton>
    </div>
  </div>
</template>
