export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("error", async (error, { event }) => {
    send(event, error.message)
  })
})