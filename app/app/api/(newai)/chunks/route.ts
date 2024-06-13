import { NextResponse, NextRequest } from "next/server";
import { fetchChunksForConcept } from "../../../../aiService";
import { openai } from "@ai-sdk/openai";
import { incrementAndLogTokenUsage } from "@/lib/incrementAndLogTokenUsage";
import { handleAuthorization } from "@/lib/handleAuthorization";

export async function POST(request: NextRequest) {
  const { userId } = await handleAuthorization(request);
  const { content, concept } = await request.json();
  const model = openai("gpt-4o");
  const response = await fetchChunksForConcept(content, concept, model);
  console.log("response", response);
  const tokens = response.usage.totalTokens;
  console.log("incrementing token usage chunks", userId, tokens);
  await incrementAndLogTokenUsage(userId, tokens);

  return NextResponse.json({ content: response.object.content });
}
