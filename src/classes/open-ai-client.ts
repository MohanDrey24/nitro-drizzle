import OpenAI from "openai";

class OpenAIClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
    });
  };

  async createThread(message: string) {
    return await this.client.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });
  };

  async createPollAndRun(
    thread_id: string,
    assistant_id: string,
    additional_instructions: string) {
      return await this.client.beta.threads.runs.createAndPoll(thread_id, {
        assistant_id,
        additional_instructions,
      });
  };

  async getResponse(thread_id: string) {
    return await this.client.beta.threads.messages.list(thread_id);
  };
};

export default OpenAIClient;