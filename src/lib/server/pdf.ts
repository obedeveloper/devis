import { render } from 'svelte/server';
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function renderToHTML(component: any, props: any): Promise<string> {
	const { body, head } = render(component, { props });
	return head + body;
}

export async function generatePdf(html: string): Promise<Buffer> {
	const isVercel = !!process.env.VERCEL_ENV;

	const browser = await puppeteer.launch({
		args: isVercel ? chromium.args : [],
		executablePath: isVercel ? await chromium.executablePath() : undefined,
		headless: true
	});

	const page = await browser.newPage();
	await page.setContent(html, { waitUntil: 'load' });

	const pdf = await page.pdf({
		format: 'A4',
		printBackground: true,
		margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
	});

	await browser.close();
	return Buffer.from(pdf);
}
