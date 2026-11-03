// Read-only post-release check: never creates an inquiry or sends a notification.
import { pathToFileURL } from "node:url";

export async function verifyInquiryHandler(base, fetchImpl = fetch) {
  const origin = new URL(base);
  if (origin.protocol !== "https:") throw new Error("Production verification requires HTTPS");
  const response = await fetchImpl(new URL("/api/inquiries", origin), {
    method: "GET",
    headers: { "User-Agent": "Mozilla/5.0 PANO-Release-Verification", Accept: "application/json" },
    redirect: "error",
    signal: AbortSignal.timeout(20000),
  });
  if (response.status !== 405 || !/^application\/json(?:;|$)/i.test(response.headers.get("content-type") || "")) {
    throw new Error(`Inquiry handler verification failed: expected 405 JSON, received ${response.status}`);
  }
  const body = await response.json();
  if (body.ok !== false || body.code !== "METHOD_NOT_ALLOWED" || !(response.headers.get("allow") || "").split(/\s*,\s*/).includes("POST")) {
    throw new Error("Inquiry handler verification failed: unexpected response");
  }
  console.log("Production inquiry handler: expected read-only 405 JSON response verified");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  verifyInquiryHandler(process.argv[2] || "https://panovacuum.com").catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
