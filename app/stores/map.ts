import type { mapPoint } from "~~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPointItem = ref<mapPoint[]>([]);

  async function init() {
    const { LngLatBounds } = await import("maplibre-gl");
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const map = useMap();
    effect(() => {
      const firstPoint = mapPointItem.value[0];
      if (!firstPoint) {
        return;
      }

      const bounds = mapPointItem.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds([firstPoint?.long, firstPoint?.long], [firstPoint?.long, firstPoint?.long]));

      map.map?.fitBounds(bounds, {
        padding: 40,
      });
    });
  }

  return { mapPointItem, init };
});
