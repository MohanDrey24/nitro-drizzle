import { usersTable } from "~~/src/db/schema"
import db from "~~/src/index"

type NewUser = typeof usersTable.$inferInsert;

export default defineEventHandler(async (event) => {
  const { name, age, email } = await readBody(event) as NewUser;

  const insertedData = await db.insert(usersTable).values({ 
    name,
    age,
    email,
  }).returning()

  return { message: "Data successfully inserted" }
})