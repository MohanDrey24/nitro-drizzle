import { usersTable } from "~~/src/db/schema"
import db from "~~/src/index"

type NewUser = typeof usersTable.$inferInsert;

export default defineEventHandler(async (event) => {
  const { name, age, email } = await readBody(event) as NewUser;

  try {
    await db.insert(usersTable).values({ 
      name,
      age,
      email,
    });

    return { message: "Data successfully inserted" };
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw createError({
        status: 409,
        statusMessage: "Conflict",
        message: "Email already exists",
      });
    };

    throw error;
  }
})