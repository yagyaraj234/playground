import { z } from "zod";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { CURRENT_MODEL } from "./model-config";
import { Output } from "ai";

interface GenerateObjectParams {
  model?: any;
  schema: any;
  prompt: string;
}

export async function generateObjectResult({
  model,
  schema = Output.object({
    schema: z.object({
      name: z.string(),
      description: z.string(),
    }),
  }),
  prompt = "",
}: GenerateObjectParams): Promise<any> {
  const { output } = await generateText({
    model: model ?? google(CURRENT_MODEL),
    output: schema,
    prompt,
  });

  return output;
}
