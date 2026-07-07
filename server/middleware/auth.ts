// stores/auth.ts
import { createAuthClient } from "better-auth/vue";
import { computed, ref } from "vue";

let authClient: ReturnType<typeof createAuthClient>;
function getAuthClient() {
  if (!authClient) {
    authClient = createAuthClient();
  }
  return authClient;
}

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<any>(null);
  const isSessionPending = ref(true);
  const actionLoading = ref(false);

  const init = async () => {
    if (session.value)
      return;

    // Récupération sécurisée uniquement côté serveur
    const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
    const client = getAuthClient();

    const useSessionRef = await client.useSession(url =>
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
      const client = getAuthClient();
      await client.signIn.social({
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
      const client = getAuthClient();
      await client.signOut();
      if (session.value) {
        session.value.value = null;
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      actionLoading.value = false;
    }
  };

  return { user, loading, signIn, signOut, init };
});
