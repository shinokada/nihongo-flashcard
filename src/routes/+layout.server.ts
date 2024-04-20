import { ANALYTICS_ID } from '$env/static/private';
import type { MetaProps } from 'runes-meta-tags';
import { splitAndCapitalize, removeHyphensAndCapitalize } from './utils/helpers';

export const load = ({ url }) => {

  const title = splitAndCapitalize(url.pathname) ? `${splitAndCapitalize(url.pathname)} - ${removeHyphensAndCapitalize(__NAME__)}` : `${removeHyphensAndCapitalize(__NAME__)}`;
  
  const basicDesc = 'Learn Japanese words with flashcards.'
  const description = splitAndCapitalize(url.pathname) ? `${splitAndCapitalize(url.pathname)} - ${basicDesc}` : `${basicDesc}`;
  
  const image = splitAndCapitalize(url.pathname) ? `https://open-graph-vercel.vercel.app/api/nihongo-flashcard?title=${splitAndCapitalize(url.pathname)}` : 'https://open-graph-vercel.vercel.app/api/nihongo-flashcard';
  
  const layoutMetaTags: MetaProps = {
    title,
    description,
    keywords: 'Japanese, flashcards, learning, language',
    twitter: {
      card: 'summary_large_image',
      site: '@shinokada',
      handle: '@shinokada',
      title,
      description,
      image,
      imageAlt: title,
    },
    og: {
      type: 'website',
      title,
      description,
      url: url.href,
      image,
      imageAlt: title,
      siteName: 'Nihongo Flashcard',
      imageWidth: '1200',
      imageHeight: '630'
    }
  };
  return {
		layoutMetaTags,
		ANALYTICS_ID
  };
};
