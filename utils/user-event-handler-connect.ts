import type { H3Event, H3EventContext } from "h3";
import type { userWithId } from "~~/lib/auth";

type connectedEvent = H3Event & {
  context: H3EventContext & {
    user: userWithId;
  };
};

export function userEventHandlerConnect<T>(handler: (event: connectedEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "unauthorised user",

      }));
    }
    return await handler(event as connectedEvent);
  });
}
