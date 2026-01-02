import cron from "node-cron";

export function registerReportCron() {
  cron.schedule("0 */20 * * * *", async () => {
    try {
      console.log("report cron started this will run every 20 minutes");

      // example use cases:
      // - generate daily report
      // - aggregate analytics
      // - send summary email

      fetch("https://chat.yagyaraj.com/api/room/create", {
        headers: {
          "content-type": "application/json",
        },
        },
        body: '{"username":"anon-lion-gxn"}',
        method: "POST",
      });

      console.log("report cron finished");
    } catch (error) {
      console.error("report cron failed", error);
    }
  });
      const response = await fetch("https://chat.yagyaraj.com/api/room/create", {
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: '{"username":"anon-lion-gxn"}',
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
}
