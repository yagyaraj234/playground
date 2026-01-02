import { registerCleanupCron } from "./cron/cleanup";
import { registerReportCron } from "./cron/reports";

registerCleanupCron();
registerReportCron();

console.log("server started");
