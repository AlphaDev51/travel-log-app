import { createAuthClient } from "better-auth/vue";
import { computed, ref } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = authClient.useSession();

  // Variable unique pour traquer le clic (login / logout)
  const isActionPending = ref(false);

  const user = computed(() => session.value.data?.user);

  // Fusionne le chargement de la session initiale ET l'état du clic
  const loading = computed(() =>
    session.value.isPending
    || session.value.isRefetching
    || isActionPending.value,
  );

  const signIn = async () => {
    isActionPending.value = true;

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
      });
    }
    catch {
      isActionPending.value = false; // On reset discrètement sans rien print
    }
  };

  const signOut = async () => {
    isActionPending.value = true;

    try {
      await authClient.signOut();
    }
    catch {
      // On ne fait rien si ça échoue
    }
    finally {
      isActionPending.value = false;
    }
  };

  return {
    loading,
    signIn,
    signOut,
    user,
  };
});
