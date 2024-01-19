import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeDictionaryData() {
	const browser = await puppeteer.launch({ headless: 'new' }); // Set headless to true
	const page = await browser.newPage();

	try {
		await page.goto('https://en.m.wikipedia.org/wiki/List_of_gairaigo_and_wasei-eigo_terms', {
			waitUntil: 'domcontentloaded'
		});

		const forbiddenWords = [
			'panty',
			'sex',
			'erotic',
			'orgy',
			'virgin',
			'bar',
			'sexual',
			'prostitution',
			'escort',
			'adult video',
			'brothel',
			'masochist',
			'sadist',
			'love hotel',
			'masturbation',
			'penis'
		];

		const extractedData = await page.evaluate((forbiddenWordsJSON) => {
			// Parse the JSON string back to the forbiddenWords array inside page.evaluate()
			const forbiddenWords = JSON.parse(forbiddenWordsJSON);

			const rows = Array.from(document.querySelectorAll('tbody tr'));
			const data = [];

			rows.forEach((row) => {
				const cells = Array.from(row.querySelectorAll('td'));

				if (cells.length >= 4) {
					const [firstTd, romajiElement, , englishCell] = cells;

					let japanese =
						firstTd.querySelector('span[lang="ja"]')?.textContent?.trim() ||
						firstTd.textContent.trim();
					const romaji =
						romajiElement.querySelector('i[lang="ja-Latn"]')?.textContent?.trim() || '';
					const english = englishCell.textContent.trim();

					// Check if any forbidden word is present in the English text
					const containsForbiddenWord = forbiddenWords.some((word) =>
						english.toLowerCase().includes(word.toLowerCase())
					);

					if (!containsForbiddenWord) {
						data.push({
							japanese,
							romaji,
							english
						});
					}
				}
			});

			return data;
		}, JSON.stringify(forbiddenWords)); // Pass forbiddenWords as a JSON string argument

		const jsonContent = JSON.stringify(extractedData, null, 2);
		await fs.writeFile('src/lib/data/gairaigo.json', jsonContent);

		console.log('All data extracted and saved to gairaigo.json');
	} catch (error) {
		console.error('Error occurred during scraping:', error);
	} finally {
		await browser.close();
	}
}

scrapeDictionaryData();
