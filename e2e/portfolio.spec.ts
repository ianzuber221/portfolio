import { test, expect, type Page } from "@playwright/test";

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1280, height: 800 },
  desktop: { width: 1920, height: 1080 },
} as const;

async function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

function isBenign(error: string) {
  return /Download the React DevTools|favicon\.ico/i.test(error);
}

test.describe("routes", () => {
  test("home, resume, sitemap, robots, icon, and health respond", async ({
    request,
  }) => {
    const checks: Array<[string, number, string?]> = [
      ["/", 200],
      ["/resume", 200],
      ["/sitemap.xml", 200],
      ["/robots.txt", 200],
      ["/icon.svg", 200],
      ["/api/health", 200],
    ];
    for (const [path, status] of checks) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(status);
    }
  });

  test("opengraph image is a PNG", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/image\/png/);
    const body = await res.body();
    expect(body.byteLength).toBeGreaterThan(1000);
  });

  test("chat API streams a fallback reply without an OpenAI key", async ({
    request,
  }) => {
    const res = await request.post("/api/chat", {
      data: {
        messages: [{ role: "user", content: "What's his experience with AI?" }],
        context: { company: "Vercel" },
      },
    });
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text.length).toBeGreaterThan(40);
    expect(text).toMatch(/BNY|Angular|agent|MCP/i);
  });
});

test.describe("console / hydration", () => {
  test("home has no hydration or runtime errors", async ({ page }) => {
    const errors = await collectPageErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Ian Zuber/i })).toBeVisible();
    const real = errors.filter((e) => !isBenign(e));
    expect(real, real.join("\n")).toEqual([]);
  });

  test("resume has no hydration or runtime errors", async ({ page }) => {
    const errors = await collectPageErrors(page);
    await page.goto("/resume");
    await expect(page.getByRole("heading", { name: "Ian Zuber" })).toBeVisible();
    const real = errors.filter((e) => !isBenign(e));
    expect(real, real.join("\n")).toEqual([]);
  });
});

test.describe("layout / overflow", () => {
  for (const [name, size] of Object.entries(VIEWPORTS)) {
    test(`${name} (${size.width}x${size.height}) has no horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize(size);
      await page.goto("/");
      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return {
          overflow: root.scrollWidth > root.clientWidth + 1,
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
        };
      });
      expect(
        overflow.overflow,
        `${name}: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}`,
      ).toBe(false);
    });
  }
});

test.describe("theme", () => {
  test("toggle switches html.dark and persists across reload", async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS.laptop);
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /switch to (light|dark) mode/i });
    await expect(toggle).toBeVisible();
    // Wait until ThemeProvider hydrates and writes the persisted theme.
    await expect
      .poll(async () =>
        page.evaluate(() => window.localStorage.getItem("portfolio-theme")),
      )
      .toBeTruthy();

    const before = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    await toggle.click();
    await expect
      .poll(async () =>
        page.evaluate(() => document.documentElement.classList.contains("dark")),
      )
      .not.toBe(before);

    await page.reload();
    const afterReload = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    expect(afterReload).not.toBe(before);
  });
});

test.describe("chat", () => {
  test("suggested prompt streams a reply without reloading", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.laptop);
    await page.goto("/");
    await page.evaluate(() => {
      (window as unknown as { __marker?: string }).__marker = "stay";
    });
    await page.locator("#ai").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /experience with AI/i }).click();
    await expect(page.locator("#ai [aria-live]")).toContainText(/BNY|Angular|agent|MCP/i, {
      timeout: 10_000,
    });
    const marker = await page.evaluate(
      () => (window as unknown as { __marker?: string }).__marker,
    );
    expect(marker).toBe("stay");
  });
});

test.describe("mobile", () => {
  test.use({ viewport: VIEWPORTS.mobile });

  test("sticky action bar is visible and hero CTAs are full width", async ({
    page,
  }) => {
    await page.goto("/");
    const bar = page.getByRole("link", { name: "Ask my AI assistant" });
    await expect(bar).toBeVisible();
    await expect(page.getByRole("link", { name: "View résumé" })).toBeVisible();

    const chatCta = page.getByRole("link", { name: /Chat with my AI/i }).first();
    const box = await chatCta.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeGreaterThan(280);

    const previewVisible = await page
      .locator("text=Ask my AI")
      .nth(0)
      .evaluate((el) => (el as HTMLElement).offsetParent !== null)
      .catch(() => false);
    // The desktop-only preview heading should not take layout on mobile.
    const desktopPreview = page.locator(".hidden.lg\\:block");
    await expect(desktopPreview).toHaveCount(1);
    await expect(desktopPreview).toBeHidden();
    void previewVisible;
  });

  test("chat inputs are 16px so iOS Safari will not auto-zoom", async ({
    page,
  }) => {
    await page.goto("/#ai");
    const size = await page.locator("#ai-input").evaluate((el) =>
      getComputedStyle(el).fontSize,
    );
    expect(size).toBe("16px");
  });

  test("jumping to #ai clears the sticky header", async ({ page }) => {
    await page.goto("/#ai");
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const header = document.querySelector("header");
          const section = document.querySelector("#ai");
          if (!header || !section) return true;
          const h = header.getBoundingClientRect();
          const s = section.getBoundingClientRect();
          return s.top < h.bottom - 1;
        }),
      )
      .toBe(false);
  });
});

test.describe("desktop", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test("hero AI preview is visible and the mobile bar is hidden", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Ask my AI").first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Ask my AI assistant" }),
    ).toBeHidden();

    const chatCta = page.getByRole("link", { name: /Chat with my AI/i }).first();
    const box = await chatCta.boundingBox();
    expect(box).toBeTruthy();
    // Desktop CTAs stay compact, not full-bleed.
    expect(box!.width).toBeLessThan(400);
  });
});

test.describe("resume", () => {
  test("renders experience, skills, and a print control", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByRole("heading", { name: "Ian Zuber" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "AI Frontend Engineer · BNY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download \/ Print PDF/i }),
    ).toBeVisible();
  });
});
