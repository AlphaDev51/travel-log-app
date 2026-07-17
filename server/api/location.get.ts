import { findLocations } from "~~/src/db/queries/location";
import { userEventHandlerConnect } from "~~/utils/user-event-handler-connect";

export default userEventHandlerConnect(async (event) => {
  return await findLocations(event.context.user.id);
});
