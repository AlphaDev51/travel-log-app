<!-- Map.client.vue -->
<script setup lang="ts">
import type { Map as MapLibreMap } from "maplibre-gl";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import "maplibre-gl/dist/maplibre-gl.css";

const colorMode = useColorMode();
const mapContainer = ref<HTMLDivElement | null>(null);
const map = ref<MapLibreMap | null>(null);

function getStyle() {
  return colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty";
}

onMounted(async () => {
  await nextTick();

  if (!mapContainer.value) {
    console.error("[Map] Container not found. Initialization cancelled.");
    return;
  }

  try {
    const { Map } = await import("maplibre-gl");

    const mapInstance = new Map({
      container: mapContainer.value,
      style: getStyle(),
      center: [2.3522, 48.8566],
      zoom: 4,
      trackResize: true,
    });

    mapInstance.on("error", (e: any) => {
      console.error("[Map] Internal MapLibre error (style/tiles):", e.error?.message || e);
    });

    mapInstance.on("load", () => {
      mapInstance.resize();
      setTimeout(() => {
        mapInstance.resize();
      }, 200);
    });

    map.value = mapInstance;
  }
  catch (error) {
    console.error("[Map] Critical initialization error:", error);
  }
});

watch(() => colorMode.value, () => {
  if (map.value) {
    map.value.setStyle(getStyle());
  }
});

onUnmounted(() => map.value?.remove());
</script>

<template>
  <div ref="mapContainer" class="w-full h-full min-h-62.5" />
</template>

<style scoped>
:deep(.maplibregl-canvas) {
  width: 100% !important;
  height: 100% !important;
}
</style>
