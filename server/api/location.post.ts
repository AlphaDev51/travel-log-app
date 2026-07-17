import slugify from "slug";
import { findLocationByName, findUniqueSlug, InsertLocationDB } from "~~/src/db/queries/location";
import { InsertLocation } from "~~/src/db/schema";
import { userEventHandlerConnect } from "~~/utils/user-event-handler-connect";

export default userEventHandlerConnect(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "unauthorised user",

    }));
  }
  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    const data = result
      .error
      ?.issues
      .reduce((error, i) => {
        error[i.path.join("")] = `${i.message}`;
        return error;
      }, {} as Record<string, string>);

    const statusMessage = result
      .error
      ?.issues
      .map(i => ` ${i.path.join("")}: ${i.message}`)
      .join("; ");

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const existingLocation = await findLocationByName(result.data, event.context.user.id);

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exist",
    }));
  }

  const slug = await findUniqueSlug(slugify(result.data.name));

  try {
    return InsertLocationDB(result.data, slug, event.context.user.id);
  }
  catch (e: any) {
    const error = e;

    if (error.cause?.message?.includes("SQLite error: UNIQUE constraint failed: location.slug")) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "the slug must be unique (the name is used to generate the slug)",
      }));
    }
    throw error;
  }
});
