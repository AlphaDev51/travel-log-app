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
    submitError.value = error.data?.statusMessage || error.statusMessage || "An Unknow error occured";
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
  <div class="container max-w-md mx-auto p-6 my-6 bg-base-100 rounded-2xl border border-base-content/5 shadow-sm">
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold tracking-tight text-base-content">
        Add Location
      </h1>
      <p class="text-sm text-base-content/60 mt-1">
        Fill in the details below to register a new geographic point.
      </p>
    </div>

    <!-- Form Section -->
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div v-if="submitError" role="alert" class="alert alert-error alert-soft">
        <span>{{ submitError }}</span>
      </div>
      <!-- Name Field -->
      <AppFormField
        legend="Name"
        name="name"
        placeholder="e.g. Central Park Office"
        :error="errors.name"
        :disabled="loading"
      />

      <!-- Description Field -->

      <AppFormField
        legend="Description"
        name="description"
        type="textarea"
        placeholder="Describe this location..."
        :error="errors.description"
        :disabled="loading"
      />

      <!-- Coordinates Grid (Lat & Long side-by-side) -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Latitude -->

        <AppFormField
          legend="Latitude"
          name="lat"
          placeholder="0.0000"
          :error="errors.lat"
          :disabled="loading"
        />

        <!-- Longitude -->

        <AppFormField
          legend="Longitude"
          name="long"
          placeholder="0.0000"
          :error="errors.long"
          :disabled="loading"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end items-center gap-3 mt-4 pt-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-ghost px-5 font-medium rounded-xl hover:bg-base-content/10 active:scale-95 transition-all duration-200 text-base-content/70"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="18" class="mr-1.5" />
          Cancel
        </button>

        <button

          :disabled="loading"
          type="submit"
          class="btn btn-accent px-6 font-semibold rounded-xl shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 active:scale-95 transition-all duration-200 text-white"
        >
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:map-pin-plus"
            size="18"
            class="ml-1.5"
          />
        </button>
      </div>
    </form>
  </div>
</template>
