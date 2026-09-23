import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';

// 09/02/2026:
//npm install dotenv -- install this as this will help us to supply environment variables at the run time
// in selenium we used to do :mvn clean install -Denv="qa"
//ENV=qa npx playwright test
const ENV = process.env.ENV ||'qa';
console.log('Running tests on Environment: ', ENV);
dotenv.config({path: `config/.env.${ENV}`});

console.log('Environment:', ENV);
console.log('BASE_URL:', process.env.BASE_URL);
console.log('APP_USERNAME:', process.env.APP_USERNAME);


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: [
    ['list'],   
    ['html'],
     ["allure-playwright", {
        outputFolder:"allure-results",
        suiteTitle:true,
     }]
  ],
  
  use: {
     // baseURL: 'http://localhost:3000',
     //baseURL: 'https://naveenautomationlabs.com/',
    baseURL:process.env.BASE_URL,
    headless: false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],


});
