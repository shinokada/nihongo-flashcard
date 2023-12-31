export function randomword (wordList){
  return wordList[Math.floor(Math.random() * wordList.length)];
}

export function getRandomItemFromDictionary (dictionary) {
  const keys = Object.keys(dictionary);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  
  return {
    [randomKey]: dictionary[randomKey]
  };
}

export function getRandomPair(jsonData, langlang, isVerb = false ) {
  const randomIndex = Math.floor(Math.random() * jsonData.length);
  const randomPair = jsonData[randomIndex];
  // console.log('isVerb: ', isVerb)
  let front, back, kanji, hiragana, romaji, english, japanese, reading
  
  if (isVerb) {
    ({ kanji, hiragana, romaji, english } = randomPair);
  } else {
    ({ japanese, reading, english } = randomPair);
  }

  if (langlang === 'japeng') {
    if (isVerb) {
      front = `${hiragana} (${kanji}, ${romaji})`;
    } else { 
      front = `${japanese} (${reading})`;
    }
    back = english;
  } else if (langlang === 'engjap') {
    front = english;
    if (isVerb) {
      back = `${hiragana} (${kanji}, ${romaji})`;
    } else {
      back = `${japanese} (${reading})`;
    }
  } else if (langlang === 'kanjap' && isVerb) {
    front = kanji
    back = `${hiragana} (${romaji})`
  }
  // console.log(front, back)
  return { front, back };
}

// export function getRandomVerb(jsonData, langlang) {
//   const randomIndex = Math.floor(Math.random() * jsonData.length);
//   const randomPair = jsonData[randomIndex];
//   console.log('randomPair', randomPair)
//   let front
//   let back
  
//   let { kanji, hiragana, romaji, english } = randomPair;

//   if (langlang === 'japeng') {
//     front = `${hiragana} (${kanji}, ${romaji})`;
//     back = english;
//   } else if (langlang === 'engjap') {
//     front = english;
//     back = `${hiragana} (${kanji}, ${romaji})`;
//   }
//   // console.log(front, back)
//   return { front, back };
// }


export function openTab(word, website) {
  let baseUrl = '';
  if( website === 'google'){
    baseUrl = 'https://translate.google.com/?hl=en&tab=TT&sl=no&tl=en&op=translate&text='
  } else {
    baseUrl = 'https://ordbokene.no/bm/search?q=';
  }

  const url = baseUrl + encodeURIComponent(word);
  window.open(url, '_blank');
}

export function cleanWord(word) {
  // Remove characters after '/'
  let withoutSlash = word.replace(/\/.*$/, '');

  // Remove characters after ','
  let withoutComma = withoutSlash.replace(/,.*/, '');

  // Remove characters after ' -'
  let withoutHyphen = withoutComma.replace(/ -.*/, '');

  return withoutHyphen.trim(); // Trim to remove leading/trailing spaces
}
