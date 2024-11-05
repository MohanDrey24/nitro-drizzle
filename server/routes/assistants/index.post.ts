import OpenAI from "openai";

export default defineEventHandler(async(event) => {
  const { apiKey, assistantId: assistant_id } = useRuntimeConfig(event);

  // create an openai client
  const client = new OpenAI({
    apiKey,
  });

  // create thread
  const thread = await client.beta.threads.create({
    messages: [
      {
        role: 'user',
        content: '"What is Scala?"',
      },
    ],
  });
  
  // create message and retrieve message
  const run = await client.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id,
    additional_instructions: 'Please be professional and avoid giving compliments or positive comments. Write your response in Gitlab Markdown Format.'
  });

  if (run.status === 'completed') {
    const messages = await client.beta.threads.messages.list(thread.id);
    const block = messages.data[0]?.content[0];
    if (block && block.type === 'text') console.log(block.text.value);
  };
})
