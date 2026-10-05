import { defineConfig, devices } from '@playwright/test';

/**
 * Config used for the timeout / config-options assignment.
 * Run with: npx playwright test --config=playwright.timeouts.config.ts
 */
export default defineConfig({
  testDir: './tests',
  /* Only pick up the spec files written for this assignment */
  testMatch: ['timeouts-in-config.spec.ts', 'config-options.spec.ts'],
  /* Where screenshots, videos and traces are written */
  outputDir: './test-results/timeouts-config',

  /* ---------- Timeouts ---------- */
  /* Max time a single test (incl. hooks & fixtures) may run - default 30s */
  timeout: 40_000,
  /* Max time the whole run may take - default 0 (no limit) */
  globalTimeout: 10 * 60_000,
  expect: {
    /* Max time an expect() assertion keeps retrying - default 5s */
    timeout: 8_000,
  },

  /* ---------- Execution ---------- */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  /* Stop the whole run after this many failures */
  maxFailures: 5,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report/timeouts-config', open: 'never' }]],

  use: {
    /* Max time each action (click, fill, ...) may take - default 0 (no limit) */
    actionTimeout: 10_000,
    /* Max time page.goto / waitForURL etc. may take - default 0 (no limit) */
    navigationTimeout: 20_000,

    /* page.goto('/checkboxes') resolves against this */
    baseURL: 'https://practice.expandtesting.com',
    headless: true,
    viewport: { width: 1366, height: 768 },
    locale: 'en-GB',
    timezoneId: 'Europe/Amsterdam',
    ignoreHTTPSErrors: true,

    /* Artifacts */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },
    {
      name: 'firefox-slow',
      /* Project-level overrides win over the top-level values */
      timeout: 60_000,
      expect: { timeout: 12_000 },
      use: { ...devices['Desktop Firefox'], viewport: { width: 1366, height: 768 }, actionTimeout: 15_000 },
    },
  ],
});
