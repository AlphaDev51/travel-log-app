import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slug";
import db from "~~/src/db";
import { InsertLocation, location } from "~~/src/db/schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export default defineEventHandler(async (event) => {
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

  const existingLocation = await db.query.location.findFirst({
    where:
      and(
        eq(location.name, result.data.name),
        eq(location.userId, event.context.user.id),
      ),
  });

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exist",
    }));
  }

  let slug = slugify(result.data.name);
  let existingSlug = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));

  while (existingSlug) {
    const randomID = nanoid();
    const newSlug = `${slug}-${randomID}`;

    existingSlug = !!(await db.query.location.findFirst({
      where: eq(location.slug, newSlug),
    }));

    if (!existingSlug) {
      slug = newSlug;
    }
  }
  try {
    const [created] = await db.insert(location).values({
      ...result.data,
      slug,
      userId: event.context.user.id,
    }).returning();

    return created;
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
