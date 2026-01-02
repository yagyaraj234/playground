import { RefilUserCredits } from "../user/credits";
export function GET(request: Request) {
  console.log("CRON RAN AT:", new Date().toISOString());

  RefilUserCredits();

  return new Response("Cron job running");
}
