import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';

async function scrapeDictionaryData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto('https://en.m.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words', {
      waitUntil: 'domcontentloaded',
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
          const separatorIndex = textContent.lastIndexOf(' – ');

          if (separatorIndex !== -1) {
            english = textContent.substring(separatorIndex + 3).trim().split('(')[0].trim(); // Get English, remove content within parentheses
          }

          extractedData.push({
            hiragana,
            kanji,
            english,
            romaji,
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
