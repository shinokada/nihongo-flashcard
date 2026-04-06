import type { PageLoad } from './$types';
import type { VocabEntry } from '$lib/types';

const vocabLoaders: Record<string, () => Promise<{ default: VocabEntry[] }>> = {
	n5: () => import('$lib/data/vocab-n5.json') as unknown as Promise<{ default: VocabEntry[] }>,
	n4: () => import('$lib/data/vocab-n4.json') as unknown as Promise<{ default: VocabEntry[] }>
};

export const load: PageLoad = async ({ params }) => {
	const { level, category } = params;
	const loader = vocabLoaders[level.toLowerCase()];

	if (!loader) {
		return { entries: [] as VocabEntry[], level: level.toUpperCase(), category };
	}

	const vocab = await loader();
	const entries = vocab.default.filter((e) => e.category === category);

	return { entries, level: level.toUpperCase(), category };
};
