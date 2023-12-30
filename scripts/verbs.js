import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeVocabularyData() {
  const browser = await puppeteer.launch({ headless: "new" }); // Set headless to true
  const page = await browser.newPage();

  try {
    await page.goto('https://cotoacademy.com/basic-japanese-verbs-for-beginners/', {
      waitUntil: 'domcontentloaded',
    });

    const data = await page.evaluate(() => {
      const tables = document.querySelectorAll('.wp-block-table');
      const thirdTable = tables[2]; // Select the third table (index 2)
      const tableRows = thirdTable.querySelectorAll('tbody tr');

      // Extracting data from the third table
      const vocabularyData = Array.from(tableRows).map(row => {
        const columns = row.querySelectorAll('td');
        return {
          kanji: columns[0].textContent.trim(),
          hiragana: columns[1].textContent.trim(),
          romaji: columns[2].textContent.trim(),
          english: columns[3].textContent.trim(),
        };
      });

      return vocabularyData;
    });

    const jsonContent = JSON.stringify(data, null, 2);
    await fs.writeFile('src/lib/data/verbs.json', jsonContent);

    console.log('Data from the third table extracted and saved to verbs.json');
  } catch (error) {
    console.error('Error occurred during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeVocabularyData();
