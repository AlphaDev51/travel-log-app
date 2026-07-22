<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="btn btn-ghost gap-2 px-2"
    >
      <div class="avatar">
        <div class="w-6 rounded-full">
          <img
            v-if="authStore.user.image"
            :src="authStore.user.image"
            :alt="authStore.user.name"
          >
          <div v-else class="bg-base-300 flex items-center justify-center w-full h-full">
            <Icon
              name="tabler:user"
              size="14"
              class="text-base-content/50"
            />
          </div>
        </div>
      </div>
      <span class="text-sm font-medium">{{ authStore.user.name }}</span>
    </div>

    <ul tabindex="-1" class="dropdown-content menu bg-base-100 border border-base-300 rounded-lg z-50 w-48 mt-2 p-1 shadow-sm">
      <li>
        <NuxtLink to="/signout" class="flex items-center gap-2 text-error text-sm px-2 py-1.5 rounded-md">
          <Icon name="tabler:logout" size="16" />
          Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>

  <button
    v-else
    :disabled="authStore.loading"
    class="btn btn-neutral gap-2"
    @click="authStore.signIn()"
  >
    <span v-if="authStore.loading" class="loading loading-spinner loading-sm" />
    <template v-else>
      <slot />
      <Icon name="tabler:brand-github" size="16" />
    </template>
  </button>
</template>
