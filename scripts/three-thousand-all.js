// the result is the same as three-thousand-all.js
// this script loop through three files.

import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeVocabularyData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    let allData = [];

    await page.goto('file:///Users/shinichiokada/Svelte/nihongo-flashcard/scripts/3000-common-JP-words/All.html', {
      waitUntil: 'domcontentloaded',
    });

    const data = await page.evaluate(() => {
      const tableRows = Array.from(document.querySelectorAll('table tr'));

      const vocabularyData = tableRows.slice(3, -1).map((row) => {
        const columns = row.querySelectorAll('td');

        return {
          japanese: columns[3].textContent.trim(),
          romaji: columns[4].textContent.trim(),
          english: columns[5].textContent.trim(),
        };
      });

      return vocabularyData;
    });

    allData = allData.concat(data);
    

    const jsonContent = JSON.stringify(allData, null, 2);
    await fs.writeFile('src/lib/data/three-thousand-all.json', jsonContent);

    console.log('All data extracted and saved to three-thousand.json');
  } catch (error) {
    console.error('Error occurred during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeVocabularyData();
