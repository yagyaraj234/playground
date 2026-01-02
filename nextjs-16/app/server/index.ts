import cron from "node-cron";
import { createRoom } from "./room";

const tasks: ReturnType<typeof cron.schedule>[] = [];

export async function registerReportCron() {
  console.log("[Cron] Registering Report Cron...");

  // Original (Every minute): "0 * * * * *"
  const task = cron.schedule("0 0 * * * *", async () => {
    console.log("[Cron] Report Job Triggered");
    try {
      await createRoom("anon-lion-gxn");
    } catch (error) {
      console.error("[Cron] Job execution failed:", error);
    }
  });

  tasks.push(task);
  console.log("[Cron] Report Job Scheduled (Runs every day at 00:00)");
}

export function initCronJobs() {
  registerReportCron();
}
