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

export function splitAndCapitalize(text: string) {
	// Split the string using '/' as the delimiter
	const parts = text.split('/');

	// If there are no parts, return an empty string e.g home returns /
	if (!parts.length) return '';

	// Get the last element of the array and capitalize it
	// return parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
	return removeHyphensAndCapitalize(parts[parts.length - 1]);
}

export function metaTitle(pathname: string, name: string) {
	return splitAndCapitalize(pathname)
		? `${splitAndCapitalize(pathname)} - ${removeHyphensAndCapitalize(name)}`
		: `${removeHyphensAndCapitalize(name)}`;
}

export function metaDescription(pathname: string, baseDescription: string) {
	return splitAndCapitalize(pathname)
		? `${splitAndCapitalize(pathname)} - ${baseDescription}`
		: `${baseDescription}`;
}

export function metaImg(pathname: string, siteUrl: string) {
	return splitAndCapitalize(pathname)
		? `https://open-graph-vercel.vercel.app/api/${siteUrl}?title=${splitAndCapitalize(pathname)}`
		: `https://open-graph-vercel.vercel.app/api/${siteUrl}`;
}
