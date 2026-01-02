export function GET(request: Request) {
  console.log("CRON RAN AT:", new Date().toISOString());

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
    },
    body: '{"username":"anon-lion-gxn"}',
    method: "POST",
  });

  return new Response("Cron job running");
}
