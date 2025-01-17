import { test as base, BrowserContext, Cookie } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

const COOKIES_PATH = path.resolve(__dirname, 'cookies.json');

type CookiesFixture = {
  cookies: Cookie[];
  context: BrowserContext;
};

const test = base.extend<CookiesFixture>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  cookies: async ({ context }, use) => {
    let cookies: Cookie[] = [];

    try {
      // Check if cookies file exists
      await fs.access(COOKIES_PATH);
      // Load cookies from the file
      const data = await fs.readFile(COOKIES_PATH, 'utf-8');
      cookies = JSON.parse(data);
      await context.addCookies(cookies);
    } catch (error) {
      // If file doesn't exist or any error occurs, fetch fresh cookies
      const response = await context.request.get('https://www.scentbird.com/shop/travel-size/perfumes');
      
      // Check if the response is successful
      if (!response.ok()) {
        throw new Error(`Failed to fetch cookies: ${response.status()} ${response.statusText()}`);
      }

      // Capture cookies from the context
      cookies = await context.cookies();

      // Filter essential cookies
      cookies = cookies.filter(cookie =>
        ['datadome', 'solvvy_session', 'csrfToken', 'scnt_locale', 'scnt_session_v3'].includes(cookie.name)
      );

      // Ensure the directory exists before writing
      const dir = path.dirname(COOKIES_PATH);
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (mkdirError) {
        console.error(`Failed to create directory ${dir}:`, mkdirError);
      }

      // Save essential cookies to the file for future use
      await fs.writeFile(COOKIES_PATH, JSON.stringify(cookies, null, 2), 'utf-8');
    }

    await use(cookies);
  },
});

export default test;
export { expect } from '@playwright/test';
