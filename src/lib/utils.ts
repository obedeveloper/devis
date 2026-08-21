export function transformOptional(input: string) {
	if (!input) return undefined;
	return input;
}

/**
 * Make a string safe for use in a Content-Disposition filename: strips
 * characters that would break the header or the filesystem. Falls back to
 * "file" when nothing safe remains.
 */
export function sanitizeFilename(name: string) {
	const safe = name.replace(/[\r\n"\\/]+/g, '').trim();
	return safe || 'file';
}

/**
 * Format an amount with an optional currency code. Uses a fixed locale so
 * server-rendered and client-rendered output always match (no hydration
 * mismatch) and PDFs look the same everywhere.
 */
export function formatAmount(value: number, currency?: string | null) {
	if (!currency) return value.toFixed(2);
	return new Intl.NumberFormat('en', { style: 'currency', currency }).format(value);
}
