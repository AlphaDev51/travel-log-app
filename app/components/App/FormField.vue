<script setup lang="ts">
const props = defineProps<{
  legend: string;
  name: string;
  type?: "text" | "textarea";
  placeholder: string;
  error?: string;
  disable?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend font-medium text-base-content/80">
      {{ props.legend }}
    </legend>
    <Field
      :as="type || 'input'"
      :name="props.name"
      :type="props.type || 'text'"
      :placeholder="props.placeholder"
      :disable="props.disable"
      class="input-bordered w-full rounded-xl focus:input-accent transition-all duration-200"
      :class="{
        'input': !props.type || props.type === 'text',
        'textarea': props.type === 'textarea',
        'input-error': props.error,
      }"
    />
    <p v-if="props.error" class="label text-error italic">
      {{ props.error }}
    </p>
  </fieldset>
</template>
