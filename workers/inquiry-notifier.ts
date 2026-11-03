import { notifyPending, type NotificationEnv } from "../lib/inquiry-notifications.ts";
export default {
  async scheduled(_event: unknown, env: NotificationEnv): Promise<void> { await notifyPending(env); },
  fetch(): Response { return new Response("Not found", { status: 404 }); },
};
