export function GET(request: Request) {
  console.log("CRON RAN AT:", new Date().toISOString());
  return new Response("Cron job running");
}
