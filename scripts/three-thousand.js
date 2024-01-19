import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeVocabularyData() {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	try {
		// I could use All.html
		const htmlFiles = [
			'/Users/shinichiokada/Svelte/nihongo-flashcard/scripts/3000-common-JP-words/1k.html',
			'/Users/shinichiokada/Svelte/nihongo-flashcard/scripts/3000-common-JP-words/2k.html',
			'/Users/shinichiokada/Svelte/nihongo-flashcard/scripts/3000-common-JP-words/3k.html'
		];

		let allData = [];

		for (const file of htmlFiles) {
			await page.goto(`file://${file}`, {
				waitUntil: 'domcontentloaded'
			});

			const data = await page.evaluate(() => {
				const tableRows = Array.from(document.querySelectorAll('table tr'));

				const vocabularyData = tableRows.slice(1).map((row) => {
					const columns = row.querySelectorAll('td');

					return {
						japanese: columns[3].textContent.trim(),
						romaji: columns[4].textContent.trim(),
						english: columns[5].textContent.trim()
					};
				});

				return vocabularyData;
			});

			allData = allData.concat(data);
		}

		const jsonContent = JSON.stringify(allData, null, 2);
		await fs.writeFile('src/lib/data/three-thousand.json', jsonContent);

		console.log('All data extracted and saved to three-thousand.json');
	} catch (error) {
		console.error('Error occurred during scraping:', error);
	} finally {
		await browser.close();
	}
}

scrapeVocabularyData();
