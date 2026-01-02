import cron from "node-cron";

export async function registerReportCron() {
  console.log("job scheduled");
  cron.schedule("0 */1 * * * *", async () => {
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
        console.log("response not ok");
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("response ok");
      }
    } catch (error) {
      console.log("error",error);
      console.error(error);
    }
  });
}
