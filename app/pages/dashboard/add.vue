<script setup lang="ts">
import type { FetchError } from "ofetch";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { InsertLocation } from "~~/src/db/schema";

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const submitError = ref("");
const submitted = ref(false);
const loading = ref(false);

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    submitError.value = "";
    await $csrfFetch("/api/location", {
      method: "post",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.data?.statusMessage || error.statusMessage || "An unknown error occurred";
  }
  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Do you want to leave? You will lose your unsaved changes.");
    if (!confirm) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="px-5 py-4 border-b border-base-300 flex items-center gap-3">
      <button
        class="btn btn-ghost btn-sm btn-square"
        type="button"
        @click="router.back()"
      >
        <Icon name="tabler:arrow-left" size="16" />
      </button>
      <div>
        <h2 class="text-sm font-semibold text-base-content">
          Add Location
        </h2>
        <p class="text-xs text-base-content/50">
          Register a new geographic point
        </p>
      </div>
    </div>

    <form class="flex-1 overflow-y-auto flex flex-col gap-4 p-5" @submit.prevent="onSubmit">
      <div
        v-if="submitError"
        role="alert"
        class="alert alert-error alert-soft text-sm"
      >
        <span>{{ submitError }}</span>
      </div>

      <AppFormField
        legend="Name"
        name="name"
        placeholder="e.g. Central Park Office"
        :error="errors.name"
        :disabled="loading"
      />

      <AppFormField
        legend="Description"
        name="description"
        type="textarea"
        placeholder="Describe this location..."
        :error="errors.description"
        :disabled="loading"
      />

      <div class="grid grid-cols-2 gap-3">
        <AppFormField
          legend="Latitude"
          name="lat"
          placeholder="0.0000"
          :error="errors.lat"
          :disabled="loading"
        />
        <AppFormField
          legend="Longitude"
          name="long"
          placeholder="0.0000"
          :error="errors.long"
          :disabled="loading"
        />
      </div>

      <div class="flex justify-end items-center gap-2 pt-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-ghost btn-sm"
          @click="router.back()"
        >
          Cancel
        </button>

        <button
          :disabled="loading"
          type="submit"
          class="btn btn-neutral btn-sm gap-1.5"
        >
          <span v-if="loading" class="loading loading-spinner loading-xs" />
          <template v-else>
            Add
            <Icon name="tabler:map-pin-plus" size="15" />
          </template>
        </button>
      </div>
    </form>
  </div>
</template>
