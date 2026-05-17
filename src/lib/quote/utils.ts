export const formatDate = new Intl.DateTimeFormat(undefined, {
	year: 'numeric',
	month: 'long',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit'
});

export const formatPrice = (currency: string) => {
	const formatter = new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency,
		maximumFractionDigits: 2
	});

	return {
		formatCents: (cents: number) => formatter.format(cents / 100)
	};
};
