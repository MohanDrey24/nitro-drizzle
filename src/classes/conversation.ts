import OpenAIClient from "./open-ai-client";

class Conversation {
  private openAIClient: OpenAIClient;
  private assistantId: string;

  constructor(apiKey: string, assistantId: string) {
    this.openAIClient = new OpenAIClient(apiKey);
    this.assistantId = assistantId;
  }

  async getResponse(message: string, additional_instructions: string) {
    // create thread
    const thread = await this.openAIClient.createThread(message);

    // run assistant and poll until completion
    const run = await this.openAIClient.createPollAndRun(thread.id, this.assistantId, additional_instructions);

    if (run.status === 'completed') {
      const messages = await this.openAIClient.getResponse(thread.id);
      const block = messages.data[0]?.content[0]

      if (block && block.type === 'text') {
        return block.text.value;
      };

      return null;
    };
  };
};

export default Conversation;