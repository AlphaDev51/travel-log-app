<script setup lang="ts">
import ThemeToggle from "~/components/App/ThemeToggle.vue";

const isSidebarOpen = ref(true);
const sideBarStore = useSideBar();
const locationStore = useLocation();
const authStore = useAuthStore();
const route = useRoute();
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
};

if (route.path !== "/dashboard") {
  locationStore.refresh();
}
onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});
</script>

<template>
  <div class="flex h-screen bg-base-100 antialiased overflow-hidden">
    <!-- SIDEBAR -->
    <aside
      class="bg-base-100 border-r border-base-300 transition-all duration-200 flex flex-col justify-between shrink-0"
      :class="{ 'w-56': isSidebarOpen, 'w-14': !isSidebarOpen }"
    >
      <div class="flex flex-col gap-0.5 flex-1 py-3">
        <div class="h-9 flex items-center px-3 justify-between mb-2" :class="{ 'justify-center': !isSidebarOpen }">
          <span v-if="isSidebarOpen" class="text-[11px] font-semibold tracking-wide text-base-content/40 uppercase px-1">
            Workspace
          </span>
          <button
            class="btn btn-ghost btn-xs btn-square hover:bg-base-200"
            @click="toggleSidebar"
          >
            <Icon :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="16" />
          </button>
        </div>

        <div class="flex flex-col gap-0.5 px-2">
          <SidebarButton
            :show-label="isSidebarOpen"
            label="Locations"
            icon="tabler:map"
            href="/dashboard"
          />
          <SidebarButton
            :show-label="isSidebarOpen"
            label="Add Location"
            icon="tabler:circle-plus"
            href="/dashboard/add"
          />
        </div>

        <div class="flex flex-col gap-0.5 px-2 pt-3">
          <ClientOnly>
            <div v-if="sideBarStore.loading" class="flex flex-col gap-2 px-2.5 py-1">
              <div v-for="i in 2" :key="i" class="flex items-center gap-2.5 h-6">
                <div class="skeleton w-4 h-4 shrink-0 opacity-50" />
                <div v-if="isSidebarOpen" class="skeleton h-3 w-20 opacity-40" />
              </div>
            </div>
            <SidebarButton
              v-for="item in sideBarStore.sideBarItem"
              :key="item.id"
              :show-label="isSidebarOpen"
              :label="item.label"
              :icon="item.icon"
              :href="item.href"
            />
          </ClientOnly>
        </div>
      </div>

      <!-- Bas de sidebar : thème + utilisateur -->
      <div class="border-t border-base-300 p-2 space-y-1">
        <div class="flex items-center px-2 py-1" :class="isSidebarOpen ? 'justify-between' : 'justify-center'">
          <span v-if="isSidebarOpen" class="text-xs text-base-content/50">Theme</span>
          <ThemeToggle />
        </div>

        <ClientOnly>
          <div
            v-if="!authStore.loading && authStore.user"
            class="dropdown dropdown-top w-full"
          >
            <div
              tabindex="0"
              role="button"
              class="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-base-200 transition-colors w-full"
              :class="{ 'justify-center': !isSidebarOpen }"
            >
              <div class="avatar shrink-0">
                <div class="w-6 rounded-full">
                  <img v-if="authStore.user.image" :src="authStore.user.image" :alt="authStore.user.name">
                  <div v-else class="bg-base-300 flex items-center justify-center w-full h-full">
                    <Icon name="tabler:user" size="14" class="text-base-content/50" />
                  </div>
                </div>
              </div>
              <span v-if="isSidebarOpen" class="text-xs font-medium text-base-content/80 truncate">
                {{ authStore.user.name }}
              </span>
            </div>

            <ul tabindex="-1" class="dropdown-content menu bg-base-100 border border-base-300 rounded-lg z-50 w-48 p-1 mb-2 shadow-sm">
              <li>
                <NuxtLink to="/signout" class="flex items-center gap-2 text-error text-xs px-2 py-1.5 rounded-md">
                  <Icon name="tabler:logout" size="15" />
                  Sign Out
                </NuxtLink>
              </li>
            </ul>
          </div>
        </ClientOnly>
      </div>
    </aside>

    <!-- CONTENU : liste (scrollable) + carte (full height) -->
    <div class="flex-1 flex overflow-hidden">
      <div class="w-105 shrink-0 border-r border-base-300 overflow-y-auto">
        <NuxtPage />
      </div>

      <div class="flex-1 relative">
        <ClientOnly>
          <AppMap />
          <template #fallback>
            <div class="absolute inset-0 flex items-center justify-center text-sm text-base-content/40 bg-base-200">
              Loading map…
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
