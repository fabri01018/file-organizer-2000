import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

const models = {
  "gpt-4o": openai("gpt-4o"),
  "gpt-4o-mini": openai("gpt-4o-mini"),
  "claude-3-5-sonnet-20240620": anthropic("claude-3-5-sonnet-20240620"),
};

export const getModel = (name: string) => {
  if (!models[name]) {
    console.log(`Model ${name} not found`);
    console.log(`Defaulting to gpt-4o`);
    return models["gpt-4o"];
  }
  console.log(`Using model ${models[name]}`);
  return models[name];
};
