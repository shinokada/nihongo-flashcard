import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeDictionaryData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto('https://nihongoichiban.com/2011/08/03/list-of-i-adjectives-for-the-jlpt-n5/', {
      waitUntil: 'domcontentloaded',
    });

    const dataFromFirstPage = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr'));

      const extractedData = [];

      for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].querySelectorAll('td');

        if (columns.length === 4) {
          const kanji = columns[0].textContent.trim();
          const hiragana = columns[1].textContent.trim();
          const romaji = columns[2].textContent.trim();
          const english = columns[3].textContent.trim();

          extractedData.push({
            kanji,
            hiragana,
            romaji,
            english,
          });
        }
      }

      return extractedData;
    });

    // Load another page for scraping
    await page.goto('https://nihongoichiban.com/2012/06/04/list-of-na-adjectives-for-the-jlpt-n5/', {
      waitUntil: 'domcontentloaded',
    });

    const dataFromSecondPage = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr'));

      const extractedData = [];

      for (let i = 1; i < rows.length; i++) {
        const columns = Array.from(rows[i].querySelectorAll('td')); // Convert NodeList to an array

        if (columns.length === 4 && columns.every(column => column.textContent.trim() !== '')) {
          const kanji = columns[0].textContent.trim();
          const hiragana = columns[1].textContent.trim();
          const romaji = columns[2].textContent.trim();
          const english = columns[3].textContent.trim();

          extractedData.push({
            kanji,
            hiragana,
            romaji,
            english,
          });
        }
      }

      return extractedData;
    });

    const combinedData = dataFromFirstPage.concat(dataFromSecondPage);

    const jsonContent = JSON.stringify(combinedData, null, 2);
    await fs.writeFile('src/lib/data/adjectives.json', jsonContent);

    console.log('All data extracted and saved to adjectives.json');
  } catch (error) {
    console.error('Error occurred during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeDictionaryData();
