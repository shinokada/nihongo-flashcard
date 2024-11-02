import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeDictionaryData() {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	try {
		// Set up console listener so that it will console on a terminal
		page.on('console', (msg) => {
			for (let i = 0; i < msg.args().length; ++i) {
				console.log(`[Browser Console] ${msg.args()[i]}`);
			}
		});

		await page.goto('https://en.m.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words', {
			waitUntil: 'domcontentloaded'
		});

		const dataFromPage = await page.evaluate(() => {
			const listItems = document.querySelectorAll('ul > li');

			const extractedData = [];

			listItems.forEach((li) => {
				const spans = li.querySelectorAll('span.Jpan > a');
				const italicTag = li.querySelector('i');

				if (spans.length === 2 && italicTag) {
					const hiragana = spans[0].textContent.trim(); // Get hiragana
					const kanji = spans[1].textContent.trim(); // Get kanji
					const romaji = italicTag.textContent.trim(); // Get Romaji
					let english = '';

					const textContent = li.textContent.trim();

					// looking for one or more occurrences of whitespace, en dash, or hyphen. The website has a dash and hyphen.
					const separatorIndex = textContent.search(/[\s–-]+/);

					if (separatorIndex !== -1) {
						const substringAfterSeparator = textContent.substring(separatorIndex + 3).trim();

						// Find the last occurrence of "("
						const lastOpeningParenthesisIndex = substringAfterSeparator.lastIndexOf('(');

						// Use the last occurrence to split the string
						english =
							lastOpeningParenthesisIndex !== -1
								? substringAfterSeparator.substring(0, lastOpeningParenthesisIndex).trim()
								: substringAfterSeparator;
					}
					extractedData.push({
						hiragana,
						kanji,
						english,
						romaji
					});
				}
			});

			return extractedData;
		});

		const jsonContent = JSON.stringify(dataFromPage, null, 2);
		await fs.writeFile('src/lib/data/nouns.json', jsonContent);

		console.log('All data extracted and saved to noun.json');
	} catch (error) {
		console.error('Error occurred during scraping:', error);
	} finally {
		await browser.close();
	}
}

scrapeDictionaryData();
