import { chromium } from "playwright";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const file = path.resolve(docs, relative);
  if (!file.startsWith(docs) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const base = process.env.SITE_URL || `http://127.0.0.1:${address.port}`;
const cachedChromium = "/home/diablo/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || (fs.existsSync(cachedChromium) ? cachedChromium : undefined);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const errors = [];

async function inspect(name, viewport, route, screenshot) {
  const page = await browser.newPage({ viewport });
  page.on("console", (message) => { if (message.type() === "error") errors.push(`${name}: console: ${message.text()}`); });
  page.on("pageerror", (error) => errors.push(`${name}: pageerror: ${error.message}`));
  const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  if (!response?.ok()) errors.push(`${name}: HTTP ${response?.status()}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) errors.push(`${name}: horizontal overflow ${overflow}px`);
  await page.screenshot({ path: screenshot, fullPage: true });
  return page;
}

const desktop = await inspect("desktop home", { width: 1440, height: 1000 }, "/", "/tmp/finish-first-home-desktop.png");
if (await desktop.locator(".shelf-card").count() !== 11) errors.push("desktop home: expected 11 shelf cards");
await desktop.close();

const article = await inspect("desktop essay", { width: 1440, height: 1000 }, "/essays/software-architecture-hard-parts.html", "/tmp/finish-first-essay-desktop.png");
if (await article.locator(".mission").count() !== 1) errors.push("desktop essay: mission missing");
await article.locator("[data-complete-mission]").click();
if ((await article.locator("[data-complete-mission]").getAttribute("aria-pressed")) !== "true") errors.push("desktop essay: completion did not persist in UI");
await article.close();

const mobile = await inspect("mobile home", { width: 390, height: 844 }, "/", "/tmp/finish-first-home-mobile.png");
await mobile.locator("[data-menu-button]").click();
if ((await mobile.locator("[data-menu-button]").getAttribute("aria-expanded")) !== "true") errors.push("mobile home: menu did not open");
await mobile.waitForTimeout(300);
const menuBox = await mobile.locator("[data-book-nav]").boundingBox();
if (!menuBox || menuBox.x >= 390 || menuBox.x + menuBox.width <= 0) errors.push("mobile home: open menu is outside the viewport");
await mobile.screenshot({ path: "/tmp/finish-first-menu-mobile.png" });
await mobile.close();

await browser.close();
server.close();
if (errors.length) {
  console.error("Visual check failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log("Visual check passed: desktop home, desktop essay, mobile home, mission completion, and mobile menu.");
