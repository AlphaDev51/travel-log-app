// server/middleware/auth.ts
import { auth } from "~~/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api/auth")) {
    return;
  }

  if (event.path.startsWith("/dashboard")) {
    const session = await auth.api.getSession({ headers: event.headers });

    if (!session) {
      await sendRedirect(event, "/", 302);
    }
  }
});
