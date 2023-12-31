import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeVocabularyData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    let allData = [];

    await page.goto('https://japanese-lessons.net/Japanese/lessons/japanese-onomatopoeia-lesson.html', {
      waitUntil: 'domcontentloaded',
    });

    const data = await page.evaluate(() => {
      const tableRows = Array.from(document.querySelectorAll('table tr'));

      const vocabularyData = tableRows.slice(2).map((row) => {
        const columns = row.querySelectorAll('td');

        return {
          japanese: columns[0].textContent.trim(),
          romaji: columns[1].textContent.trim(),
          english: columns[2].textContent.trim(),
        };
      });

      return vocabularyData;
    });

    allData = allData.concat(data);
    

    const jsonContent = JSON.stringify(allData, null, 2);
    await fs.writeFile('src/lib/data/onomatopoeia.json', jsonContent);

    console.log('All data extracted and saved to three-thousand.json');
  } catch (error) {
    console.error('Error occurred during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeVocabularyData();
