import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const artifactDir = "C:/Users/sanka/.gemini/antigravity/brain/6f0c1b53-23af-414c-9a4e-47bc3f40b531";
  const consoleErrors = [];

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(`[PAGE ERROR] ${err.message}`);
  });

  console.log("--- 1. TESTING HOME PAGE ---");
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  console.log("Page title:", await page.title());

  const h1 = await page.locator("h1").innerText();
  console.log("H1 text:", h1.replace(/\n/g, " "));

  const orbitCount = await page.locator(".orbit").count();
  console.log("Orbit element count:", orbitCount);

  const researchCards = await page.locator(".research-card").count();
  console.log("Research cards count:", researchCards);

  const approachItems = await page.locator(".approach-item").count();
  console.log("Approach items count:", approachItems);

  await page.screenshot({ path: `${artifactDir}/screenshot-home-desktop.png`, fullPage: true });
  console.log("Saved screenshot-home-desktop.png");

  console.log("--- 2. TESTING TEAM PAGE ---");
  await page.click("nav a[href='/team']");
  await page.waitForURL("**/team");
  console.log("Team title:", await page.title());

  const teamCards = await page.locator(".team-card").count();
  console.log("Team cards count:", teamCards);

  const memberName = await page.locator(".team-card h3").innerText();
  const memberRole = await page.locator(".team-card .team-role").innerText();
  console.log(`Member: ${memberName}, Role: ${memberRole}`);

  const linkedin = page.locator(".team-card a.linkedin-button");
  const linkedinHref = await linkedin.getAttribute("href");
  const linkedinTarget = await linkedin.getAttribute("target");
  const linkedinRel = await linkedin.getAttribute("rel");
  console.log(`LinkedIn: href=${linkedinHref}, target=${linkedinTarget}, rel=${linkedinRel}`);

  await page.screenshot({ path: `${artifactDir}/screenshot-team-desktop.png`, fullPage: true });
  console.log("Saved screenshot-team-desktop.png");

  console.log("--- 3. TESTING CONTACT PAGE & FORM VALIDATION ---");
  await page.click("nav a.nav-button");
  await page.waitForURL("**/contact");
  console.log("Contact title:", await page.title());

  // Submit without filling
  await page.click("button[type='submit']");
  const errorCount = await page.locator(".form-error").count();
  console.log("Validation errors shown on empty submit:", errorCount);

  // Fill invalid email
  await page.fill("input[name='name']", "Test Researcher");
  await page.fill("input[name='email']", "invalid-email");
  await page.fill("input[name='subject']", "AI Performance Evaluation");
  await page.fill("textarea[name='message']", "Interested in 2-month POC validation.");
  await page.click("button[type='submit']");

  const emailErrorCount = await page.locator(".form-error").count();
  console.log("Errors shown with invalid email:", emailErrorCount);

  // Correct email
  await page.fill("input[name='email']", "test@research-partner.com");
  await page.screenshot({ path: `${artifactDir}/screenshot-contact-desktop.png`, fullPage: true });
  console.log("Saved screenshot-contact-desktop.png");

  console.log("--- 4. TESTING MOBILE VIEWPORT ---");
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });

  const toggleBtn = mobilePage.locator(".hamburger");
  console.log("Mobile toggle visible:", await toggleBtn.isVisible());

  // Open menu
  await toggleBtn.click();
  const navActive = await mobilePage.locator("nav.active").count();
  console.log("Mobile menu opened successfully:", navActive > 0);

  await mobilePage.screenshot({ path: `${artifactDir}/screenshot-home-mobile-menu.png` });

  // Close menu
  await toggleBtn.click();
  await mobilePage.screenshot({ path: `${artifactDir}/screenshot-home-mobile.png`, fullPage: true });
  console.log("Saved mobile screenshots");

  console.log("--- 5. CONSOLE ERRORS SUMMARY ---");
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors.join("\n"));
  }

  await browser.close();
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
