import db from "~~/src/db";
import { InsertLocation, location } from "~~/src/db/schema";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "unauthorised user",

    }));
  }
  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    //  ` ${i.path.join("")}: ${i.message}`
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

  const [created] = await db.insert(location).values({
    ...result.data,
    slug: result.data.name.replaceAll(" ", "-").toLowerCase(),
    userId: event.context.user.id,
  }).returning();

  return created;
});
