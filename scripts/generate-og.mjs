import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'static', 'og.png');

const width = 1200;
const height = 630;

const html = `<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<style>
		* {
			margin: 0;
			box-sizing: border-box;
		}
		body {
			width: ${width}px;
			height: ${height}px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 100px;
			background: #000;
			color: #fff;
			font-family: system-ui, -apple-system, sans-serif;
			position: relative;
			overflow: hidden;
		}
		main {
			max-width: 640px;
		}
		h1 {
			font-size: 110px;
			font-weight: 800;
			letter-spacing: -0.04em;
			line-height: 1;
		}
		p {
			margin-top: 28px;
			font-size: 32px;
			line-height: 1.4;
			color: rgba(255, 255, 255, 0.7);
		}
		.card {
			width: 320px;
			background: #fff;
			border-radius: 16px;
			padding: 28px;
			transform: rotate(4deg);
			box-shadow: 0 30px 60px rgba(255, 255, 255, 0.12);
		}
		.bar {
			height: 14px;
			border-radius: 7px;
			background: rgba(0, 0, 0, 0.85);
		}
		.bar.thin {
			height: 10px;
			background: rgba(0, 0, 0, 0.15);
		}
		.row {
			display: flex;
			justify-content: space-between;
			gap: 24px;
			margin-top: 18px;
		}
		.total {
			margin-top: 26px;
			padding-top: 18px;
			border-top: 2px solid rgba(0, 0, 0, 0.1);
		}
	</style>
</head>
<body>
	<main>
		<h1>Devis</h1>
		<p>Professional quotes in minutes.</p>
	</main>
	<div class="card" aria-hidden="true">
		<div class="bar" style="width: 70%"></div>
		<div class="row"><div class="bar thin" style="width: 45%"></div><div class="bar thin" style="width: 15%"></div></div>
		<div class="row"><div class="bar thin" style="width: 55%"></div><div class="bar thin" style="width: 20%"></div></div>
		<div class="row total"><div class="bar thin" style="width: 25%"></div><div class="bar" style="width: 25%"></div></div>
	</div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
try {
	const page = await browser.newPage();
	await page.setViewport({ width, height });
	await page.setContent(html, { waitUntil: 'load' });
	await mkdir(dirname(output), { recursive: true });
	await page.screenshot({ path: output });
	console.log(`OG image written to ${output}`);
} finally {
	await browser.close();
}
