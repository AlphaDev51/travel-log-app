<script setup lang="ts">
const locationStore = useLocation();
const { locations, status } = storeToRefs(locationStore);
onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="px-5 py-4 border-b border-base-300 flex items-center justify-between">
      <div>
        <h2 class="text-sm font-semibold text-base-content">
          Locations
        </h2>
        <p class="text-xs text-base-content/50">
          {{ locations?.length || 0 }} saved
        </p>
      </div>
      <NuxtLink to="/dashboard/add" class="btn btn-sm btn-neutral gap-1.5">
        <Icon name="tabler:plus" size="16" />
        Add
      </NuxtLink>
    </div>

    <div v-if="status === 'pending'" class="flex-1 flex items-center justify-center">
      <span class="loading loading-spinner loading-sm text-base-content/40" />
    </div>

    <div v-else-if="!locations || locations.length === 0" class="flex-1 flex flex-col items-center justify-center px-6 text-center gap-2">
      <Icon
        name="tabler:map-off"
        size="28"
        class="text-base-content/30"
      />
      <p class="text-sm font-medium text-base-content/70">
        No locations yet
      </p>
      <p class="text-xs text-base-content/40 max-w-50">
        Add your first location to see it on the map.
      </p>
    </div>

    <div v-else class="flex-1 overflow-y-auto divide-y divide-base-300">
      <button
        v-for="location in locations"
        :key="location.id"
        class="w-full text-left px-5 py-3.5 hover:bg-base-200/60 transition-colors flex items-start gap-3 group"
      >
        <Icon
          name="tabler:map-pin-filled"
          size="16"
          class="text-base-content/40 group-hover:text-primary mt-0.5 shrink-0 transition-colors"
        />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-base-content truncate">
            {{ location.name }}
          </p>
          <p v-if="location.description" class="text-xs text-base-content/50 line-clamp-1 mt-0.5">
            {{ location.description }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>
