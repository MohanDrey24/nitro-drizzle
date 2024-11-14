import { usersTable } from "~~/src/db/schema"
import db from "~~/src/index"
import { handleException } from "~~/plugins/handle-exception";
import * as zod from "zod";

const userSchema = zod.object({
  name: zod.string(),
  age: zod.number(),
  email: zod.string().email(),
});

type User = zod.infer<typeof userSchema>

export default defineEventHandler(async (event) => {
  const { name, age, email } = await readBody<User>(event);

  try {
    userSchema.parse({ name, age, email })
    
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