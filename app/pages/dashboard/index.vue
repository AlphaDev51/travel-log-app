<script setup lang="ts">
const locationStore = useLocation();
const { locations, status } = storeToRefs(locationStore);
onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-base-300 pb-5">
      <div>
        <h2 class="text-2xl font-black tracking-wider uppercase text-base-content">
          Locations
        </h2>
        <p class="text-xs text-base-content/60 mt-0.5">
          Explore and manage your saved destination checkpoints
        </p>
      </div>

      <NuxtLink
        to="/dashboard/add"
        class="btn btn-accent btn-sm sm:btn-md gap-2 font-semibold shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 active:scale-95 transition-all duration-200 text-white"
      >
        Add Location
        <Icon name="tabler:map-pin-plus" size="18" />
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="flex flex-col items-center justify-center py-12 space-y-3">
      <span class="loading loading-spinner loading-md text-accent" />
      <span class="text-xs text-base-content/50 font-medium">Fetching your map logs...</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="!locations || locations.length === 0" class="card bg-base-200 border border-base-300 text-center p-8">
      <div class="card-body items-center max-w-sm mx-auto space-y-2">
        <div class="w-12 h-12 rounded-full bg-base-300 flex items-center justify-center text-base-content/40">
          <Icon name="tabler:map-off" size="24" />
        </div>
        <h3 class="font-bold text-lg text-base-content">
          No locations logged yet
        </h3>
        <p class="text-sm text-base-content/60">
          Your travel log is empty. Click the button above to pin your first journey on the map.
        </p>
      </div>
    </div>

    <!-- Locations List (Grid layout for better space efficiency) -->
    <div v-else class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="location in locations"
        :key="location.id"
        class="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-200 group"
      >
        <div class="card-body p-5 space-y-1">
          <div class="flex items-center gap-2">
            <Icon
              name="tabler:map-pin"
              class="text-accent group-hover:scale-110 transition-transform duration-200 shrink-0"
              size="20"
            />
            <h3 class="font-bold text-lg text-base-content truncate">
              {{ location.name }}
            </h3>
          </div>

          <!-- Conditional statement handling nullable descriptions -->
          <p v-if="location.description" class="text-sm text-base-content/70 line-clamp-2">
            {{ location.description }}
          </p>
          <p v-else class="text-sm text-base-content/40 italic font-light">
            No description provided for this memorable spot.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
