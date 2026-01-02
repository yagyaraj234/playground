import cron from "node-cron";

export function registerCleanupCron() {
  cron.schedule("0 3 * * *", async () => {
    try {
      console.log("cleanup cron started");

      // example logic
      // await deleteExpiredSessions();

      console.log("cleanup cron finished");
    } catch (error) {
      console.error("cleanup cron failed", error);
    }
  });
}
