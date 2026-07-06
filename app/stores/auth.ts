// stores/auth.ts
import { createAuthClient } from "better-auth/vue";
import { computed, ref } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<any>(null);
  const isSessionPending = ref(true);

  // 🌟 On gère l'état de chargement des boutons (signIn / signOut)
  const actionLoading = ref(false);

  const init = async () => {
    if (session.value)
      return;

    const useSessionRef = await authClient.useSession(url =>
      useFetch(url, { key: "better-auth-session" }),
    );

    session.value = useSessionRef.data;
    isSessionPending.value = useSessionRef.isPending as unknown as boolean;
  };

  // 🌟 Le loader global écoute le chargement initial ET l'action en cours
  const loading = computed(() => isSessionPending.value || actionLoading.value);
  const user = computed(() => session.value?.value?.user ?? null);

  const signIn = async () => {
    if (actionLoading.value)
      return; // 🔒 Bloque les clics multiples
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
      return; // 🔒 Bloque les clics multiples (évite les 3 'sign-out' de l'image)
    actionLoading.value = true;
    try {
      await authClient.signOut();

      // 🌟 Correction réactivité : On vide proprement la valeur interne de la Ref
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
