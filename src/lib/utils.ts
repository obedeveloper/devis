export function transformOptional(input: string) {
	if (!input) return undefined;
	return input;
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
