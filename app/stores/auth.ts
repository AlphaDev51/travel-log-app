// app/stores/auth.ts
import { createAuthClient } from "better-auth/vue";
import { computed, ref } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const { data: session } = useFetch<{ user: any; session: any } | null>("/api/session");

  const loading = ref(false);

  const user = computed(() => session.value?.user ?? null);

  const signIn = async () => {
    loading.value = true;
    try {
      const { csrf } = useCsrf();
      const headers = new Headers();
      headers.append("csrf-token", csrf);
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        fetchOptions: {
          headers,
        },
      });
    }
    catch (error) {
      console.error(error);
      loading.value = false;
    }
  };

  const signOut = async () => {
    loading.value = true;
    try {
      const { csrf } = useCsrf();
      const headers = new Headers();
      headers.append("csrf-token", csrf);
      await authClient.signOut({
        fetchOptions: {
          headers,
        },
      });
      session.value = null;
      navigateTo("/");
    }
    catch (error) {
      console.error(error);
    }
    finally {
      loading.value = false;
    }
  };

  return { user, loading, signIn, signOut };
});
