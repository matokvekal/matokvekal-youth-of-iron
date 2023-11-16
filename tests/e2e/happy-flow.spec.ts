import { test, expect } from '@playwright/test';
import { Platform } from 'types/internal';

test.describe('Happy flow', () => {
  test("Should render home page -> click on 'share' intent -> go to /share/twitter -> click on instagram -> go to /share/instagrm and render the right embed", async ({
    page,
  }) => {
    await page.goto('/');

    await page.waitForSelector('h1');

    const cookiesAccept = await page.getByRole('button', { name: 'Accept All Cookies' });
    await cookiesAccept.click();

    const shareButton = await page.waitForSelector('#main_reply');
    expect(shareButton).toBeTruthy();

    const reportButton = await page.waitForSelector('#main_report');
    expect(reportButton).toBeTruthy();

    await page.click('#main_reply', { timeout: 2000 });
    await page.waitForURL('/share/twitter');

    const twitterEmbed = await page.getByRole('link', { name: 'Watch on Twitter' });
    expect(twitterEmbed).toBeTruthy();

    const idsToCheck = [Platform.Twitter, Platform.Instagram, Platform.TikTok];
    for (const idSuffix of idsToCheck) {
      await page.waitForSelector(`#platform-btn-${idSuffix}`);
    }

    const instagramButton = await page.$('#platform-btn-instagram');
    expect(instagramButton).toBeTruthy();
    await instagramButton?.click();
    await page.waitForURL('/share/instagram');

    const instagramEmbed = await page.waitForSelector('iframe[src*=instagram]');
    expect(instagramEmbed).toBeTruthy();
  });
});
