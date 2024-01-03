import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('単語 Words');
});

test('nouns page has expected h1', async ({ page }) => {
	await page.goto('/nouns');
	expect(await page.textContent('h1')).toBe('名詞 Nouns');
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
