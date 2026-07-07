// stores/auth.ts
import { createAuthClient } from "better-auth/vue";
import { computed, ref } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const actionLoading = ref(false);

  const { data: session, isPending } = authClient.useSession();

  const user = computed(() => session.value?.user ?? null);
  const loading = computed(() => isPending.value || actionLoading.value);

  const signIn = async () => {
    if (actionLoading.value)
      return;
    actionLoading.value = true;
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    }
    catch (error) {
      console.error(error);
      actionLoading.value = false;
    }
  };

  const signOut = async () => {
    if (actionLoading.value)
      return;
    actionLoading.value = true;
    try {
      await authClient.signOut();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      actionLoading.value = false;
    }
  };

  return { user, loading, signIn, signOut };
});
