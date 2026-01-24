import { dev } from '$app/environment';

export const csr = dev;

interface Feature {
	icon: string;
	text: string;
	desc: string;
	color: string;
}

export const load = () => {
	const features: Feature[] = [
		{
			icon: '💻',
			text: 'Easy Data Entry',
			desc: 'Quickly input item descriptions, quantities, units, and costs through a user-friendly interface',
			color: 'hsl(195, 61%, 48%)'
		},
		{
			icon: '⚡',
			text: 'Instant Calculations',
			desc: 'Watch as your totals and amounts update in real-time, eliminating the risk of manual errors.',
			color: 'hsl(32.2, 97.6%, 67.5%)'
		},
		{
			icon: '🍃',
			text: 'Streamlined Efficiency',
			desc: 'Save time and focus on what really matters — your business.',
			color: 'hsl(153, 43%, 43%)'
		},
		{
			icon: '📕',
			text: 'Professional PDF Output',
			desc: 'Create polished, ready-to-send PDF quotes with just a click.',
			color: 'hsl(344.5, 73.7%, 53.7%)'
		}
	];

	const images = ['/images/profile-1.jpeg', '/images/profile-2.jpeg', '/images/profile-3.jpeg'];
	const numberOfUsers = 25;

	return { features, images, numberOfUsers };
};
