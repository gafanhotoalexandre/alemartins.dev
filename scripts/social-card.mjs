import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:4173/");
  await page.evaluate(() => {
    document.documentElement.dataset.theme = "light";
    document.body.className = "";
    document.body.innerHTML = `<main style="width:1200px;height:630px;background:#f3f0e8;color:#192621;padding:64px 72px;position:relative;overflow:hidden">
      <div style="display:flex;align-items:center;gap:18px"><div class="brand-mark" style="width:52px;height:52px;font-size:30px">a<span style="color:#cb583d">.</span></div><strong style="font-size:22px;letter-spacing:-.04em">alexandre martins</strong></div>
      <div style="height:1px;background:#cecfc4;margin-top:32px"></div>
      <h1 style="font-size:92px;line-height:1.02;font-weight:800;letter-spacing:-.065em;margin-top:54px">Backend, APIs<br><span class="serif" style="font-style:italic;font-weight:400;letter-spacing:-.015em">e sistemas web<span style="color:#cb583d">.</span></span></h1>
      <p style="font-size:22px;color:#626e65;margin-top:28px">C#/.NET · Angular · React</p>
      <div class="mono" style="position:absolute;bottom:48px;left:72px;font-size:16px;color:#626e65">alemartins.dev.br</div>
      <div style="position:absolute;right:72px;bottom:48px;width:90px;height:5px;background:#cb583d"></div>
    </main>`;
  });
  await page.evaluate(() => document.fonts.ready);
  await mkdir("public", { recursive: true });
  await page.screenshot({ path: "public/social-card.png" });
  console.log("Created public/social-card.png (1200 × 630).");
} finally {
  await browser.close();
}
