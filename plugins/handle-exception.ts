import { ZodError } from "zod";


export function handleException(error: unknown) {
  if (error instanceof ZodError && error.message) {
    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: error.message,
    });
  };

  if (error instanceof Error && error.message) {
    if (error.message.includes('UNIQUE constraint failed')) {
      throw createError({
        status: 409,
        statusMessage: "Conflict",
        message: error.message,
      });
    }
  }

  throw createError({
    status: 500,
    statusMessage: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
};