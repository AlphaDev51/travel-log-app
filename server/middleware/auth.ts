// stores/auth.ts
import { createAuthClient } from "better-auth/vue";
import { computed, ref } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<any>(null);
  const isSessionPending = ref(true);
  const actionLoading = ref(false);

  const init = async () => {
    if (session.value)
      return;

    const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;

    const useSessionRef = await authClient.useSession(url =>
      useFetch(url, {
        key: "better-auth-session",
        headers: headers as Record<string, string>,
      }),
    );

    session.value = useSessionRef.data;
    isSessionPending.value = useSessionRef.isPending as unknown as boolean;
  };

  const loading = computed(() => isSessionPending.value || actionLoading.value);
  const user = computed(() => session.value?.value?.user ?? null);

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
    catch {
      actionLoading.value = false;
    }
  };

  const signOut = async () => {
    if (actionLoading.value)
      return;
    actionLoading.value = true;
    try {
      await authClient.signOut();
      if (session.value) {
        session.value.value = null;
      }
    }
    catch {
    }
    finally {
      actionLoading.value = false;
    }
  };

  return { user, loading, signIn, signOut, init };
});
