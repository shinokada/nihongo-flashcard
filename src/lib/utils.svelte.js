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

// export function oldGetRandomPair(jsonData) {
//   const randomIndex = Math.floor(Math.random() * jsonData.length);
//   const randomPair = jsonData[randomIndex];
//   const { norsk, english } = randomPair;
//   return { norsk, english };
// }

export function getRandomPair(jsonData, langlang, isExplain = false) {
  const randomIndex = Math.floor(Math.random() * jsonData.length);
  const randomPair = jsonData[randomIndex];
  // console.log('randomPair', randomPair)
  let front
  let back
  
  let { japanese, reading, english } = randomPair;
  
  if (langlang === 'japeng') {
    front = `${japanese} (${reading})`;
    back = english;
  } else if (langlang === 'engjap') {
    front = english;
    back = `${japanese} (${reading})`;
  }
  // console.log(front, back)
  return { front, back };
}


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
