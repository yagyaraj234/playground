import { google } from "@ai-sdk/google";

type Providers = "google" | "openai" | "anthropic";

export const CURRENT_MODEL = "gemini-2.5-flash";
export const CURRENT_PROVIDER: Providers = "google";

export const getCurrentModel = (provider: Providers) => {
  if (provider === CURRENT_PROVIDER) {
    return google(CURRENT_MODEL);
  }
  throw new Error(`Provider ${provider} not supported`);
};
