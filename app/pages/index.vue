<script setup lang="ts">
import AuthButton from "~/components/auth-button.vue";
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Travel Log
        </h1>
        <p class="py-6">
          A clean space to save your favorite locations, photos,
          and the raw moments that define your adventures around the world.
        </p>
        <AuthButton>Sign In With Github</AuthButton>
      </div>
    </div>
  </div>
</template>
