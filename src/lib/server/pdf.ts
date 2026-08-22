import { render } from 'svelte/server';
import type { Component } from 'svelte';
import puppeteer from 'puppeteer';
import type { Browser } from 'puppeteer';
import chromium from '@sparticuz/chromium';

export async function renderToHTML<Props extends Record<string, unknown>>(
	component: Component<Props>,
	props: Props
): Promise<string> {
	const { body, head } = render(component, { props });
	return head + body;
}

let browserPromise: Promise<Browser> | undefined;

/**
 * Launch the browser once and reuse it across requests. The promise-based
 * cache prevents concurrent requests from launching multiple browsers, and
 * resets itself if launch fails so the next request can retry.
 */
async function getBrowser(): Promise<Browser> {
	if (!browserPromise) {
		const isVercel = !!process.env.VERCEL_ENV;
		browserPromise = puppeteer
			.launch({
				args: isVercel ? chromium.args : ['--no-sandbox'],
				executablePath: isVercel ? await chromium.executablePath() : undefined,
				headless: true
			})
			.catch((error) => {
				browserPromise = undefined;
				throw error;
			});
	}
	return browserPromise;
}

export async function generatePdf(html: string): Promise<Buffer> {
	const browser = await getBrowser();
	const page = await browser.newPage();

	try {
		await page.setContent(html, { waitUntil: 'load' });

		const pdf = await page.pdf({
			format: 'A4',
			printBackground: true,
			margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
		});

		return Buffer.from(pdf);
	} finally {
		await page.close();
	}
}
