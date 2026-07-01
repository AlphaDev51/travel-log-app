import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);

  const signIn = async () => {
    try {
      loading.value = true;

      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
      });
    }
    catch {
      loading.value = false;
    }
  };

  return {
    loading,
    signIn,
  };
});
