import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const widths = [320, 375, 768, 1024, 1440];
const email = "alexandrevmartinsdelima@gmail.com";

for (const theme of ["light", "dark"] as const) {
  for (const width of widths) {
    test(`${theme}: layout, resources and accessibility at ${width}px`, async ({
      page,
    }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("response", (response) => {
        if (response.status() >= 400)
          errors.push(`${response.status()} ${response.url()}`);
      });
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const dimensions = await page.evaluate(() => ({
        width: innerWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.width);
      await expect(page.locator("#emailLink")).toHaveAttribute(
        "href",
        `mailto:${email}`,
      );
      await expect(page.locator(".project-card")).toHaveCount(3);
      await expect(page.locator(".experience-list li")).toHaveCount(4);
      for (const selector of [
        ".hero-headline",
        ".section-title",
        ".project-title",
        ".contact-title",
      ]) {
        const clipped = await page
          .locator(selector)
          .evaluateAll((elements) =>
            elements
              .filter((el) => el.scrollWidth > el.clientWidth + 1)
              .map((el) => el.textContent),
          );
        expect(clipped).toEqual([]);
      }
      await page.screenshot({
        path: testInfo.outputPath(`${theme}-${width}.png`),
        fullPage: true,
      });
      const violations = (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations;
      expect(
        violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      ).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test("system theme, saved preference and persistence", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator("#themeBtn").click();
  await expect(page.locator("#themeBtn")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#141e1b",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("mobile menu closes by Escape, outside click, anchor and resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const button = page.locator("#menuBtn");
  const nav = page.locator("#mobileNav");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(nav.locator("a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(button).toBeFocused();
  await button.click();
  await page.locator(".portrait-image").click();
  await expect(nav).toBeHidden();
  await button.click();
  await nav.locator('a[href="#projetos"]').click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.locator("#projetos")).toBeFocused();
  const top = await page
    .locator("#projetos")
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(70);
  await button.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(nav).toBeHidden();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("email copy success and rejection", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as unknown as { copied: string }).copied = text;
        },
      },
    });
  });
  await page.goto("/");
  await page.locator("#copyEmail").click();
  await expect(page.locator("#copyStatus")).toHaveText("E-mail copiado.");
  expect(
    await page.evaluate(() => (window as unknown as { copied: string }).copied),
  ).toBe(email);
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("Blocked");
    };
  });
  await page.locator("#copyEmail").click();
  await expect(page.locator("#copyStatus")).toContainText(
    "Não foi possível copiar",
  );
  await expect(page.locator("#copyEmail")).toBeEnabled();
});

test("blocked storage keeps interactions working", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator("#themeBtn").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(errors).toEqual([]);
});

test("reduced motion reveals content, including a preference change", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".is-pending")).toHaveCount(0);
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});

test("keyboard skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const titleTop = await page
    .locator(".hero-headline")
    .evaluate((el) => el.getBoundingClientRect().top);
  const headerBottom = await page
    .locator(".site-header")
    .evaluate((el) => el.getBoundingClientRect().bottom);
  expect(titleTop).toBeGreaterThanOrEqual(headerBottom);
});

test("without JavaScript, mobile content and navigation remain available", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator("#themeBtn")).toBeHidden();
  await expect(page.locator("#menuBtn")).toBeHidden();
  await expect(page.locator("#copyEmail")).toBeHidden();
  await expect(page.locator('.desktop-nav a[href="#projetos"]')).toBeVisible();
  await page.locator('.desktop-nav a[href="#projetos"]').click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(page.locator("#emailLink")).toBeVisible();
  await context.close();
});

test("search and social metadata and static resources", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Alexandre Martins - Desenvolvedor de software",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://alemartins.dev.br/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://alemartins.dev.br/social-card.png",
  );
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.svg",
    "/social-card.png",
  ])
    expect((await request.get(path)).status()).toBe(200);
  const html = await (await request.get("/")).text();
  expect(html).not.toMatch(
    /@tailwindcss\/browser|fonts\.googleapis|fonts\.gstatic/,
  );
});

test("200% desktop reflow equivalent stays usable at 720 CSS pixels", async ({
  browser,
}, testInfo) => {
  // A 1440px physical viewport at 200% gives a 720px CSS layout viewport.
  const context = await browser.newContext({
    viewport: { width: 720, height: 450 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    720,
  );
  await expect(page.locator("#menuBtn")).toBeVisible();
  await page.locator("#menuBtn").click();
  await page.locator('#mobileNav a[href="#contato"]').click();
  await expect(page.locator("#emailLink")).toBeVisible();
  expect(
    await page
      .locator("#emailLink")
      .evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("reflow-200-percent.png"),
  });
  await context.close();
});
