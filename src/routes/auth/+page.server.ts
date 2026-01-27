export const load = () => {
	const colors = [
		'hsl(144.8, 100%, 33.7%)',
		'hsl(217.4, 89%, 60.8%)',
		'hsl(43.8, 100%, 50%)',
		'hsl(5, 81.2%, 56.3%)'
	];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];

	return { accentColor: randomColor };
};
