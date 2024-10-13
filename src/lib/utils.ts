export function removeHyphensAndCapitalize(str: string) {
	// Handle empty string or strings without '-'
	if (!str || !str.includes('-')) {
		return str;
	}

	// Capitalize the first letter (including after hyphens)
	const capitalized = str.replace(/(^|\s|-)\w/g, (match) => match.toUpperCase());

	// Remove hyphens and ensure spaces after words
	return capitalized.replace(/-|\s{2,}/g, ' ');
}

export function randomword(wordList: string[]) {
	return wordList[Math.floor(Math.random() * wordList.length)];
}

export function getRandomItemFromDictionary<T>(dictionary: { [key: string]: T }): {
	[key: string]: T;
} {
	const keys = Object.keys(dictionary);
	const randomKey = keys[Math.floor(Math.random() * keys.length)];

	return {
		[randomKey]: dictionary[randomKey]
	};
}

export const randomNumberGenerator = (
	min: number,
	max: number,
	maxConsecutiveRepeats: number
): (() => number) => {
	const previousNumbers: number[] = [];

	return (): number => {
		let randomNumber: number;

		do {
			randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		} while (previousNumbers.includes(randomNumber));

		if (previousNumbers.length >= maxConsecutiveRepeats) {
			previousNumbers.shift();
		}

		previousNumbers.push(randomNumber);

		return randomNumber;
	};
};

interface Word {
	hiragana: string;
	romaji: string;
	english: string;
	kanji?: string; // Optional property for verbs
	japanese?: string; // Optional property, not for verbs
}

export function getRandomPair(
	jsonData: Word[],
	langlang: string,
	isVerb = false,
	maxConsecutiveRepeats = 50
) {
	const randomIndexFn = randomNumberGenerator(0, jsonData.length - 1, maxConsecutiveRepeats);

	const randomIndex = randomIndexFn();
	const randomPair = jsonData[randomIndex];
	// console.log('isVerb: ', isVerb)
	let front, back, kanji, hiragana, romaji, english, japanese;

	if (isVerb) {
		({ kanji, hiragana, romaji, english } = randomPair);
	} else {
		({ japanese, romaji, english } = randomPair);
	}

	if (langlang === 'japeng') {
		if (isVerb) {
			front = `${hiragana} (${kanji}, ${romaji})`;
		} else {
			front = `${japanese} (${romaji})`;
		}
		back = english;
	} else if (langlang === 'engjap') {
		front = english;
		if (isVerb) {
			back = `${hiragana} (${kanji}, ${romaji})`;
		} else {
			back = `${japanese} (${romaji})`;
		}
	} else if (langlang === 'kanjap' && isVerb) {
		front = kanji;
		back = `${hiragana} (${romaji})`;
	}
	// console.log(front, back)
	return { front, back };
}

export function openTab(word: string, website: string) {
	let baseUrl = '';
	if (website === 'google') {
		baseUrl = 'https://translate.google.com/?hl=en&tab=TT&sl=no&tl=en&op=translate&text=';
	} else {
		baseUrl = 'https://ordbokene.no/bm/search?q=';
	}

	const url = baseUrl + encodeURIComponent(word);
	window.open(url, '_blank');
}

export function cleanWord(word: string) {
	// Remove characters after '/'
	const withoutSlash = word.replace(/\/.*$/, '');

	// Remove characters after ','
	const withoutComma = withoutSlash.replace(/,.*/, '');

	// Remove characters after ' -'
	const withoutHyphen = withoutComma.replace(/ -.*/, '');

	return withoutHyphen.trim(); // Trim to remove leading/trailing spaces
}
