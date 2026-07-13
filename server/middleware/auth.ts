// server/middleware/auth.ts
import { auth } from "~~/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api/auth")) {
    return;
  }
  const session = await auth.api.getSession({ headers: event.headers });
  event.context.user = session?.user;

  if (event.path.startsWith("/dashboard")) {
    if (!session?.user) {
      await sendRedirect(event, "/", 302);
    }
  }
});
