import KuroshiroModule from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
const Kuroshiro = KuroshiroModule.default ?? KuroshiroModule;
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
	const kuroshiro = new Kuroshiro();
	await kuroshiro.init(new KuromojiAnalyzer());

	const files = [
		join(__dirname, '../src/lib/data/vocab-n5.json'),
		join(__dirname, '../src/lib/data/vocab-n4.json')
	];

	for (const filePath of files) {
		console.log(`Processing ${filePath}...`);
		const data = JSON.parse(readFileSync(filePath, 'utf-8'));

		for (let i = 0; i < data.length; i++) {
			const entry = data[i];
			if (entry.example && !entry.example_romaji) {
				try {
					entry.example_romaji = await kuroshiro.convert(entry.example, {
						mode: 'spaced',
						to: 'romaji',
						romajiSystem: 'hepburn'
					});
				} catch (err) {
					console.warn(`  Warning: Failed to convert entry ${i} (${entry.kanji}): ${err.message}`);
				}
			}
			if ((i + 1) % 50 === 0) {
				console.log(`  ${i + 1}/${data.length} done`);
			}
		}

		writeFileSync(filePath, JSON.stringify(data, null, '\t') + '\n');
		console.log(`Saved ${filePath}`);
	}

	console.log('Done!');
}

main().catch(console.error);
