import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeDictionaryData() {
  const browser = await puppeteer.launch({ headless: "new" }); // Set headless to true
  const page = await browser.newPage();

  try {
    await page.goto('https://en.m.wikipedia.org/wiki/List_of_gairaigo_and_wasei-eigo_terms', {
      waitUntil: 'domcontentloaded',
    });

    const extractedData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tbody tr'));
      const data = [];

      rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));

        if (cells.length >= 4) {
          const [japaneseElement, romajiElement, , englishCell] = cells;

          const japanese = japaneseElement.querySelector('span[lang="ja"]')?.textContent?.trim() || '';
          const romaji = romajiElement.querySelector('i[lang="ja-Latn"]')?.textContent?.trim() || '';
          const english = englishCell.textContent.trim();

          data.push({
            japanese,
            romaji,
            english,
          });
        }
      });

      return data;
    });

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
