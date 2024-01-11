import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('3000 Japanese basic words');
});

test('one-thousand page has expected h1', async ({ page }) => {
	await page.goto('/one-thousand');
	expect(await page.textContent('h1')).toBe('1000 Japanese basic words');
});

test('verbs page has expected h1', async ({ page }) => {
	await page.goto('/verbs');
	expect(await page.textContent('h1')).toBe('動詞 Verbs');
});

test('adjectives page has expected h1', async ({ page }) => {
	await page.goto('/adjectives');
	expect(await page.textContent('h1')).toBe('形容詞 Adjectives');
});

test('gairaigo page has expected h1', async ({ page }) => {
	await page.goto('/gairaigo');
	expect(await page.textContent('h1')).toBe('外来語 Gairaigo');
});

test('onomatopoeia page has expected h1', async ({ page }) => {
	await page.goto('/onomatopoeia');
	expect(await page.textContent('h1')).toBe('Onomatopoeia');
});
