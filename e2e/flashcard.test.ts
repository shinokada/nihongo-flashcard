import { expect, test } from '@playwright/test';

// ─── Basic page tests ────────────────────────────────────────────────────────

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: '日本語 Flashcard', level: 1 })).toBeVisible();
});

test('home page has level headings for N5 and N4', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'JLPT N5 — Beginner', level: 2 })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'JLPT N4 — Elementary', level: 2 })).toBeVisible();
});

test('N5 greetings flashcard page loads and shows title', async ({ page }) => {
	await page.goto('/n5/greetings');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('N5');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('greetings');
});

test('N5 greetings page has mode toggle buttons', async ({ page }) => {
	await page.goto('/n5/greetings');
	await expect(page.getByRole('button', { name: '日本語 → English' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'English → 日本語' })).toBeVisible();
});

test('N4 feelings flashcard page loads', async ({ page }) => {
	await page.goto('/n4/feelings');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('N4');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('feelings');
});

// ─── Persistence: mode toggle ────────────────────────────────────────────────

test('mode toggle persists across page reload', async ({ page }) => {
	await page.goto('/n5/greetings');

	// Default mode is 日本語 → English (full opacity), English → 日本語 is dimmed
	const japengBtn = page.getByRole('button', { name: '日本語 → English' });
	const engjapBtn = page.getByRole('button', { name: 'English → 日本語' });
	await expect(japengBtn).toHaveCSS('opacity', '1');
	await expect(engjapBtn).not.toHaveCSS('opacity', '1');

	// Switch to English → 日本語
	await engjapBtn.click();
	await expect(engjapBtn).toHaveCSS('opacity', '1');

	// Reload — mode should be restored from localStorage
	await page.reload();
	await expect(page.getByRole('button', { name: 'English → 日本語' })).toHaveCSS('opacity', '1');
	await expect(page.getByRole('button', { name: '日本語 → English' })).not.toHaveCSS(
		'opacity',
		'1'
	);
});

test('mode toggle persists when navigating to a different category', async ({ page }) => {
	await page.goto('/n5/greetings');
	await page.getByRole('button', { name: 'English → 日本語' }).click();

	// Navigate to another category
	await page.goto('/n5/colors');
	// Mode should carry over via localStorage
	await expect(page.getByRole('button', { name: 'English → 日本語' })).toHaveCSS('opacity', '1');
});

// ─── Persistence: show/hide translation ──────────────────────────────────────

test('show translation preference persists across page reload', async ({ page }) => {
	await page.goto('/n5/greetings');

	// Translation is hidden by default — "Show translation" button is visible
	const showBtn = page.getByRole('button', { name: 'Show translation' }).first();
	await expect(showBtn).toBeVisible();

	// Reveal it
	await showBtn.click();
	await expect(page.getByRole('button', { name: 'Hide translation' }).first()).toBeVisible();

	// Reload — translation should still be shown
	await page.reload();
	await expect(page.getByRole('button', { name: 'Hide translation' }).first()).toBeVisible();
});

test('show translation preference persists when navigating to another category', async ({
	page
}) => {
	await page.goto('/n5/greetings');
	await page.getByRole('button', { name: 'Show translation' }).first().click();

	await page.goto('/n5/colors');
	await expect(page.getByRole('button', { name: 'Hide translation' }).first()).toBeVisible();
});

// ─── Persistence: last-visited page ──────────────────────────────────────────

test('navigating to a flashcard page saves it and restores on cold start', async ({ page }) => {
	// Clear localStorage so we start fresh
	await page.goto('/');
	await page.evaluate(() => localStorage.clear());

	// Navigate to a flashcard page (in-app link click triggers afterNavigate)
	await page.getByRole('link', { name: 'greetings' }).first().click();
	await expect(page).toHaveURL(/\/n5\/greetings/);

	// Verify it was saved
	const saved = await page.evaluate(() => localStorage.getItem('last-flashcard-path'));
	expect(saved).toBe('/n5/greetings');

	// Simulate cold start: open a new page context to / — it should redirect
	const newPage = await page.context().newPage();
	await newPage.goto('/');
	await expect(newPage).toHaveURL(/\/n5\/greetings/);
	await newPage.close();
});

test('invalid stored last-flashcard-path is ignored and cleared', async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => localStorage.setItem('last-flashcard-path', '/invalid/greetings'));

	// Fresh load at home should not redirect to invalid path
	await page.reload();
	await expect(page).toHaveURL('/');

	const saved = await page.evaluate(() => localStorage.getItem('last-flashcard-path'));
	expect(saved).toBeNull();
});
