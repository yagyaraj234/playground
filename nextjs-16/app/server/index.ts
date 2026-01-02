import { registerCleanupCron } from "./cron/cleanup";
import { registerReportCron } from "./cron/reports";

export function initCronJobs() {
  registerCleanupCron();
  registerReportCron();

  console.log("server started");
}
