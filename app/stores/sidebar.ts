type sideBarType = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export const useSideBar = defineStore("useSideBar", () => {
  const sideBarItem = ref<sideBarType[]>([]);
  const loading = ref(true);
  return { sideBarItem, loading };
});
