<script lang="ts" setup>
import { computed } from "vue";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate">

    <input v-model="isDark" type="checkbox">
    <Icon class="swap-on" name="tabler:sun" size="24" />
    <Icon class="swap-off" name="tabler:moon-filled" size="24" />
  </label>
</template>
