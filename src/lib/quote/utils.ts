export const formatDate = new Intl.DateTimeFormat(undefined, {
	year: 'numeric',
	month: 'long',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit'
});

export const formatPrice = (currency: string) => {
	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency,
		maximumFractionDigits: 2
	});
};
