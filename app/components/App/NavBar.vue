<script setup lang="ts">
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
      <a class="btn btn-accent">
        Sign In
        <Icon name="tabler:brand-github" size="24" />
      </a>
    </div>
  </div>
</template>
