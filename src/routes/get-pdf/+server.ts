import puppeteer from 'puppeteer';
import { env } from '$env/dynamic/private';
import chromium from '@sparticuz/chromium';
import puppeteercore from 'puppeteer-core';
import { loadEstimate } from '$lib/utilities/load.js';
import { render } from 'svelte/server';
import Template from './Template.svelte';

export const POST = async ({ request }) => {
  const estimatesIds = (await request.json()) as string[];
  const estimates = await Promise.all(
    estimatesIds.map(async (est) => (await loadEstimate(est)).estimate),
  );

  const { body, head } = render(Template, { props: { estimates } });
  const html = body + head;

  return new Response(
    new Blob([(await getPDF(html)) as unknown as ArrayBuffer], {
      type: 'application/pdf',
    }),
    {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      },
    },
  );
};

async function getPDF(html: string) {
  const browser = (async () => {
    const isVercel = Boolean(env.VERCEL);

    if (isVercel) {
      return await puppeteercore.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      });
    } else {
      return await puppeteer.launch();
    }
  })();

  const page = await (await browser).newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await (await browser).close();
  return pdf;
}
