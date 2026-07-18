export const useLocation = defineStore("useLocation", () => {
  const { data: locations, status, refresh } = useFetch("/api/location", {
    lazy: true,
  });
  const sideBarStore = useSideBar();

  watchEffect(() => {
    if (locations.value) {
      sideBarStore.sideBarItem = locations.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: "#",
      }));
    }
    sideBarStore.loading = (status.value === "pending");
  });
  return { locations, status, refresh };
});
