import cron from "node-cron";

export async function registerReportCron() {
  cron.schedule("0 */20 * * * *", async () => {
    try {
      const response = await fetch(
        "https://chat.yagyaraj.com/api/room/create",
        {
          headers: {
            accept: "*/*",
            "content-type": "application/json",
          },
          body: '{"username":"anon-lion-gxn"}',
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  });
}
