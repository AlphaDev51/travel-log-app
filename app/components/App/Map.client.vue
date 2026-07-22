<!-- Map.client.vue -->
<script setup lang="ts">
import { MglMap, MglMarker } from "@indoorequal/vue-maplibre-gl";
import { getUserLocation } from "~~/utils/coordinates";
import "maplibre-gl/dist/maplibre-gl.css";

const colorMode = useColorMode();
const mapStore = useMapStore();
const { coordinates, zoom } = await getUserLocation();

const mapStyle = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty",
);

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="mapStyle"
    :center="coordinates"
    :zoom="zoom"
    class="w-full h-full min-h-62.5"
  >
    <MglMarker
      v-for="(point, index) in mapStore.mapPointItem"
      :key="index"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div class="tooltip" :data-tip="point.label">
          <div class="map-pin group">
            <div class="map-pin-ring" />
            <div class="map-pin-dot">
              <Icon name="tabler:map-pin-filled" class="w-3 h-3" />
            </div>
          </div>
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>

<style scoped>
:deep(.maplibregl-canvas) {
  width: 100% !important;
  height: 100% !important;
}

.map-pin {
  position: relative;
  cursor: pointer;
  width: 28px;
  height: 28px;
}

.map-pin-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--color-primary) 20%, transparent);
  transition: transform 0.2s ease;
}

.map-pin-dot {
  position: absolute;
  inset: 6px;
  border-radius: 9999px;
  background: var(--color-primary);
  border: 2px solid white;
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.15s ease;
}

.map-pin:hover .map-pin-dot {
  transform: scale(1.15);
}

.map-pin:hover .map-pin-ring {
  transform: scale(1.3);
}
</style>
