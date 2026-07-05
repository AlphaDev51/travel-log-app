// stores/auth.ts
import { createAuthClient } from "better-auth/vue";
import { computed, ref, toValue } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = useState<Awaited<ReturnType<typeof authClient.useSession>> | null>("auth-session", () => null);
  const actionLoading = ref(false);

  const init = async () => {
    if (session.value)
      return;
    session.value = await authClient.useSession(useFetch);
  };

  const loading = computed(() => (session.value?.isPending ?? false) || actionLoading.value);
  const user = computed(() => toValue(session.value?.data)?.user ?? null);

  const signIn = async () => {
    actionLoading.value = true;
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
      });
    }
    catch (error) {
      console.error(error);
      actionLoading.value = false;
    }
  };

  const signOut = async () => {
    actionLoading.value = true;
    try {
      await authClient.signOut();
      session.value = { data: null, isPending: false, error: null } as unknown as typeof session.value;
    }
    finally {
      actionLoading.value = false;
    }
  };

  return { loading, signIn, signOut, user, init };
});
