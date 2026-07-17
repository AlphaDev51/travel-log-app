import type { InsertLocation } from "~~/src/db/schema";
import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import db from "~~/src/db";
import { location } from "~~/src/db/schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  });
}

export async function findLocationBySlug(slug: string) {
  return !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
}

export async function findUniqueSlug(slug: string) {
  let existingSlug = await findLocationBySlug(slug);

  while (existingSlug) {
    const randomID = nanoid();
    const newSlug = `${slug}-${randomID}`;

    existingSlug = await findLocationBySlug(newSlug);

    if (!existingSlug) {
      return newSlug;
    }
  }
  return slug;
}

export async function InsertLocationDB(insert: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...insert,
    slug,
    userId,
  }).returning();

  return created;
}
