<script setup lang="ts">
const isSidebarOpen = ref(true);
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
};

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});
</script>

<template>
  <div class="flex-1 flex min-h-screen bg-base-100">
    <div
      class="bg-base-200 border-r border-base-300/60 transition-all duration-300 flex flex-col gap-1"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="h-14 flex items-center px-4"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
      >
        <button
          class="btn btn-ghost btn-sm btn-square hover:bg-base-300/50 transition-colors"
          @click="toggleSidebar"
        >
          <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="20" />
          <Icon v-else name="tabler:chevron-right" size="20" />
        </button>
      </div>

      <div class="flex flex-col gap-1.5 py-2">
        <SidebarButton :show-label="isSidebarOpen" label="Location" icon="tabler:map" href="/dashboard" />
        <SidebarButton :show-label="isSidebarOpen" label="Add Location" icon="tabler:circle-plus-filled" href="/dashboard/add" />
        <div class="divider my-1 opacity-60 px-4" />
        <SidebarButton :show-label="isSidebarOpen" label="Sign Out" icon="tabler:logout" href="/signout" />
      </div>
    </div>

    <div class="flex-1 bg-base-100 p-6" />
  </div>
</template>
