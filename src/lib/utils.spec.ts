import { describe, it, expect } from 'vitest';
import { validFlashcardPathPattern } from './utils';

describe('validFlashcardPathPattern', () => {
	it.each(['/', '/about', '/n5/greetings', '/n4/abstract', '/n4/work-school', '/n5/days-months'])(
		'accepts valid path: %s',
		(path) => {
			expect(validFlashcardPathPattern.test(path)).toBe(true);
		}
	);

	it.each([
		'/a1/greetings', // wrong level prefix
		'/n9/greetings', // unsupported level number
		'/n5/', // missing category
		'/n5/GREETINGS', // uppercase — categories are lowercase
		'/n5/greetings/extra', // too many segments
		'/n5/greetings?foo=1', // query string not part of pathname but guard anyway
		'', // empty string
		'/n55/greetings' // two-digit level
	])('rejects invalid path: %s', (path) => {
		expect(validFlashcardPathPattern.test(path)).toBe(false);
	});
});
