import type { SVGAttributes } from 'svelte/elements';
type TitleType = {
	id?: string;
	title?: string;
};

type DescType = {
	id?: string;
	desc?: string;
};

export interface BaseProps extends SVGAttributes<SVGElement> {
	size?: string;
	role?: string;
	color?: string;
	variation?: 'solid' | 'outline' | 'mini' | 'micro';
	strokeWidth?: string;
}

export interface Props extends BaseProps {
	title?: TitleType;
	desc?: DescType;
	ariaLabel?: string;
}

export type JLPTLevel = 'N5' | 'N4';

export const CATEGORIES_BY_LEVEL = {
	N5: [
		'greetings',
		'numbers',
		'colors',
		'family',
		'body',
		'food',
		'animals',
		'home',
		'days-months',
		'classroom',
		'time',
		'transportation',
		'verbs',
		'adjectives'
	],
	N4: [
		'feelings',
		'work-school',
		'society',
		'health',
		'nature',
		'transportation',
		'leisure',
		'places',
		'verbs',
		'adjectives',
		'adverbs',
		'communication',
		'daily-life',
		'abstract'
	]
} as const;

export type Category = (typeof CATEGORIES_BY_LEVEL)[JLPTLevel][number];

export interface VocabEntry {
	kanji: string;
	hiragana: string;
	romaji: string;
	english: string;
	example: string;
	example_english?: string;
	level: string;
	category: string;
	part: string;
}
