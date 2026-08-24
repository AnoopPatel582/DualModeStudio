import { spawn } from "node:child_process";
import { join } from "node:path";

const port = 3217;
const origin = `http://127.0.0.1:${port}`;
const nextCli = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const routes = [
  { path: "/", status: 200, text: "DualMode Studio" },
  { path: "/portfolio", status: 200, text: "Our Portfolio" },
  {
    path: "/long-form-editing",
    status: 200,
    text: "Premium Long-Form Video Editing Plans",
  },
  {
    path: "/short-form-editing",
    status: 200,
    text: "Premium Short Video Editing Plans",
  },
  {
    path: "/thumbnail-design",
    status: 200,
    text: "Create an Irresistible YouTube Thumbnail for Your Video",
  },
  { path: "/contact", status: 404 },
];

const server = spawn(process.execPath, [nextCli, "start", "-p", String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, NODE_ENV: "production" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

const serverExit = new Promise((resolve) => {
  server.once("exit", (code, signal) => resolve({ code, signal }));
});

async function waitForServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Production server exited before startup.\n${serverOutput}`);
    }

    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for the production server.\n${serverOutput}`);
}

async function verifyRoutes() {
  for (const route of routes) {
    const response = await fetch(`${origin}${route.path}`, { redirect: "manual" });
    const body = await response.text();
    const visibleText = body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (response.status !== route.status) {
      throw new Error(
        `${route.path} returned ${response.status}; expected ${route.status}.`
      );
    }

    if (route.text && !visibleText.includes(route.text)) {
      throw new Error(`${route.path} did not contain expected text: ${route.text}`);
    }

    console.log(`PASS ${route.path} (${response.status})`);
  }
}

try {
  await waitForServer();
  await verifyRoutes();
} finally {
  if (server.exitCode === null) server.kill();
  await Promise.race([
    serverExit,
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
}
