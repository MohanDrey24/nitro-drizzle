import { usersTable } from "~~/src/db/schema"
import db from "~~/src/index"
import { handleException } from "~~/plugins/handle-exception";

export default defineEventHandler(async (event) => {
  const { name, age, email } = await readBody(event) as typeof usersTable.$inferInsert;

  try {
    await db.insert(usersTable).values({ 
      name,
      age,
      email,
    });

    return { message: "Data successfully inserted" };
  } catch (error) {
    handleException(error)
  }
})