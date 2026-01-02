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
          accept: "*/*",
          "accept-language": "en-GB,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie:
            "AMP_MKTG_fe4beb374f=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnZlcmNlbC5jb20lMkYlMjIlMkMlMjJyZWZlcnJpbmdfZG9tYWluJTIyJTNBJTIydmVyY2VsLmNvbSUyMiU3RA==; x-auth-token=d-dMf0zNlyQ3n8foUtokO; __vercel_toolbar=1; AMP_fe4beb374f=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJiNGU4MTA0Zi1jMzdkLTQwNjQtOWVjZC0zYTdkZGE0NzlmNTklMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjIwMWM0MDE1ZC1hMzgyLTRlNzktYmU1ZC1lZTUyNGMwNWUyODQlMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzY3MzM2OTcwNDM3JTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTc2NzMzNjk3MDQ0MCUyQyUyMmxhc3RFdmVudElkJTIyJTNBMiU3RA==",
          Referer: "https://chat.yagyaraj.com/",
        },
        body: '{"username":"anon-lion-gxn"}',
        method: "POST",
      });

      console.log("report cron finished");
    } catch (error) {
      console.error("report cron failed", error);
    }
  });
}
