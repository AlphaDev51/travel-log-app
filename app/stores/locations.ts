import { useMapStore } from "./map";

export const useLocation = defineStore("useLocation", () => {
  const { data: locations, status, refresh } = useFetch("/api/location", {
    lazy: true,
  });
  const sideBarStore = useSideBar();
  const mapStore = useMapStore();
  watchEffect(() => {
    if (locations.value) {
      sideBarStore.sideBarItem = locations.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: "#",
      }));
      mapStore.mapPointItem = locations.value.map(location => ({
        id: location.id,
        label: location.name,
        lat: location.lat,
        long: location.long,
      }));
    }
    sideBarStore.loading = (status.value === "pending");
  });
  return { locations, status, refresh };
});
