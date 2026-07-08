// app/stores/auth.ts
import { createAuthClient } from "better-auth/vue";
import { computed } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const { data: session, status } = useFetch<{ user: any; session: any } | null>("/api/session", {
    key: "auth-user-session",
  });

  const user = computed(() => session.value?.user ?? null);

  const loading = computed(() => status.value === "pending");

  const signIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    }
    catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      session.value = null;
      navigateTo("/");
    }
    catch (error) {
      console.error(error);
    }
  };

  return { user, loading, signIn, signOut };
});
