import { findLocations } from "~~/src/db/queries/location";
import { userEventHandlerConnect } from "~~/utils/user-event-handler-connect";

export default userEventHandlerConnect(async (event) => {
  // await new Promise(resolve => setTimeout(resolve, 2000));
  return await findLocations(event.context.user.id);
});
