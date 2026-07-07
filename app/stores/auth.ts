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

    const clientHeaders = useRequestHeaders(["cookie"]);

    // 🌟 LA CORRECTION : Trouver l'URL de base (localhost en dev, domaine principal en prod)
    let baseURL = "";
    if (import.meta.server) {
      // En prod Vercel, on utilise l'URL système ou ton domaine configuré
      baseURL = process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    }

    const useSessionRef = await authClient.useSession(url =>
      useFetch(url, {
        key: "better-auth-session",
        baseURL,
        headers: clientHeaders as Record<string, string>,
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
