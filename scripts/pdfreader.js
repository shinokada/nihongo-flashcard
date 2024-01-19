import { PdfReader } from 'pdfreader';
import { promises as fs } from 'fs';

const pdfItems = [];
let isVocabularySection = false;
let japaneseConcatBuffer = '';

new PdfReader().parseFileItems('scripts/pdf/VocabList.N4.pdf', (err, item) => {
	if (err) console.error('error:', err);
	else if (!item) {
		console.warn('end of file');

		const jsonData = [];

		for (let i = 0; i < pdfItems.length; i += 2) {
			if (pdfItems[i].trim() === 'English') {
				isVocabularySection = true;
				continue; // Skip this line from being processed
			}

			if (isVocabularySection) {
				const currentJapanese = pdfItems[i - 1].trim();
				const currentEnglish = pdfItems[i].trim();

				if (currentJapanese.match(/[\u3400-\u9FBF]/)) {
					if (japaneseConcatBuffer) {
						japaneseConcatBuffer += `, ${currentJapanese}`;
					} else {
						japaneseConcatBuffer = currentJapanese;
					}
				} else {
					if (japaneseConcatBuffer) {
						jsonData.push({
							japanese: japaneseConcatBuffer,
							english: currentJapanese
						});
						japaneseConcatBuffer = '';
					} else {
						jsonData.push({
							japanese: currentJapanese,
							english: currentEnglish
						});
					}
				}
			}
		}

		const jsonContent = JSON.stringify(jsonData, null, 2);
		fs.writeFile('src/lib/data/vocab-n4.json', jsonContent)
			.then(() => console.log('JSON file created successfully'))
			.catch((error) => console.error('Error writing file:', error));
	} else if (item.text) {
		pdfItems.push(item.text);
	}
});
