import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await page.setViewportSize({ width: 1400, height: 1000 });
await page.goto('http://localhost:5183/rfp-dashboard', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: 'scratchpad_shot1_initial.png' });

// dismiss modal(s)
for (let i = 0; i < 3; i++) {
  const ack = page.getByRole('button', { name: 'Acknowledge' });
  if (await ack.isVisible().catch(() => false)) {
    await ack.click();
    await page.waitForTimeout(400);
  } else break;
}

const target = page.getByRole('button', { name: 'Task Dashboard S', exact: true });
await target.click();
await page.waitForTimeout(400);

// dismiss modal again if it re-shows when switching tab
for (let i = 0; i < 3; i++) {
  const ack = page.getByRole('button', { name: 'Acknowledge' });
  if (await ack.isVisible().catch(() => false)) {
    await ack.click();
    await page.waitForTimeout(400);
  } else break;
}

await page.waitForTimeout(500);
await page.screenshot({ path: 'scratchpad_shot2_taskdashboards.png', fullPage: true });

await browser.close();
