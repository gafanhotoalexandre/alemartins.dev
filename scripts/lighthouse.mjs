import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import { createServer } from "node:net";
import { mkdir, writeFile } from "node:fs/promises";

const reservation = createServer();
await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  args: [`--remote-debugging-port=${port}`],
});
try {
  await mkdir("test-results/lighthouse", { recursive: true });
  for (const formFactor of ["mobile", "desktop"]) {
    const result = await lighthouse("http://127.0.0.1:4173/", {
      port,
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      ...(formFactor === "desktop"
        ? {
            formFactor: "desktop",
            screenEmulation: {
              mobile: false,
              width: 1350,
              height: 940,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          }
        : {}),
    });
    await writeFile(
      `test-results/lighthouse/${formFactor}.json`,
      result.report[0],
    );
    await writeFile(
      `test-results/lighthouse/${formFactor}.html`,
      result.report[1],
    );
    console.log(
      formFactor,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            value.score * 100,
          ]),
        ),
      ),
    );
  }
} finally {
  await browser.close();
}
