import { test, expect } from '@playwright/test';

test.describe('Peblo Notes Core User Flows', () => {
  
  test.describe.configure({ mode: 'serial' });

  let testUserEmail = `test_${Date.now()}@example.com`;
  let testUserPassword = 'Password123!';

  test('Signup and navigate to workspace', async ({ page }) => {
    // 1. Visit signup page
    await page.goto('/signup');
    await expect(page).toHaveTitle(/Sign Up | Peblo Notes/i);

    // 2. Fill in signup form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', testUserEmail);
    await page.fill('input[name="password"]', testUserPassword);
    
    // 3. Submit
    await page.click('button[type="submit"]');

    // 4. Expect to be redirected to workspace and see empty state or welcome
    await page.waitForURL('/workspace', { timeout: 10000 });
    await expect(page.locator('text=Notes')).toBeVisible();
  });

  test('Create a note, type content, and verify autosave', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[name="email"]', testUserEmail);
    await page.fill('input[name="password"]', testUserPassword);
    await page.click('button[type="submit"]');
    await page.waitForURL('/workspace');

    // 1. Click New Note (or use shortcut)
    await page.click('button:has-text("New Note")');
    
    // 2. Expect editor to be focused/visible
    await page.waitForURL(/\/workspace\/.+/);
    
    // 3. Type into title and content
    // Based on our implementation, title is an input and content is tiptap editor
    await page.fill('input[placeholder="Untitled Note"]', 'E2E Test Note');
    await page.locator('.ProseMirror').fill('This is a test note for E2E validation.');

    // 4. Wait for autosave indicator
    await expect(page.locator('text=Saved')).toBeVisible({ timeout: 5000 });
  });

  test('Generate AI summary and copy output', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[name="email"]', testUserEmail);
    await page.fill('input[name="password"]', testUserPassword);
    await page.click('button[type="submit"]');
    await page.waitForURL('/workspace');

    // Select the first note
    await page.click('div.glass-card:has-text("E2E Test Note")');
    await page.waitForURL(/\/workspace\/.+/);

    // Click "Summarize" action in AI panel
    await page.click('button:has-text("Summarize")');
    
    // Wait for the AI output
    await expect(page.locator('text=Summary')).toBeVisible({ timeout: 15000 });
    
    // Click copy button (assuming an icon button near the output)
    const copyButton = page.locator('button[title="Copy to clipboard"]').first();
    if (await copyButton.count() > 0) {
      await copyButton.click();
      // Assume a toast "Copied!" appears
      await expect(page.locator('text=Copied')).toBeVisible();
    }
  });

  test('Share note and access public link without auth', async ({ browser, page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[name="email"]', testUserEmail);
    await page.fill('input[name="password"]', testUserPassword);
    await page.click('button[type="submit"]');
    await page.waitForURL('/workspace');

    // Select the first note
    await page.click('div.glass-card:has-text("E2E Test Note")');
    await page.waitForURL(/\/workspace\/.+/);

    // Share note
    await page.click('button:has-text("Share")');
    
    // Check "Publish to web" switch
    await page.click('button[role="switch"]');
    
    // Wait for share URL to appear
    const shareInput = page.locator('input[readonly]');
    await expect(shareInput).toBeVisible();
    const shareUrl = await shareInput.inputValue();
    expect(shareUrl).toContain('/share/');

    // Open a new incognito context to verify public access
    const context = await browser.newContext();
    const publicPage = await context.newPage();
    
    await publicPage.goto(shareUrl);
    await expect(publicPage.locator('h1')).toHaveText('E2E Test Note');
    await expect(publicPage.locator('text=This is a test note for E2E validation.')).toBeVisible();
    
    await context.close();
  });
});
