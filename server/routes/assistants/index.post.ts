import Conversation from "~~/src/classes/conversation";

export default defineEventHandler(async(event) => {
  const { apiKey, assistantId } = useRuntimeConfig(event);

  const conversation = new Conversation(apiKey, assistantId);

  const message = 'What is Scala';
  const additionalInstruction = 'Please be professional and avoid giving compliments or positive comments. Write your response in Gitlab Markdown Format.';

  const response = await conversation.getResponse(message, additionalInstruction);

  if (response) {
    console.log(response);
  } else {
    console.log("Failed to get response");
  };
});

