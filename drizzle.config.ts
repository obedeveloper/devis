import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const { DATABASE_AUTH_TOKEN } = process.env;

export default defineConfig({
	schema: './src/lib/db/schema/index.ts',
	out: './src/lib/db/migrations',
	dialect: DATABASE_AUTH_TOKEN ? 'turso' : 'sqlite',
	dbCredentials: { url: process.env.DATABASE_URL, authToken: DATABASE_AUTH_TOKEN },
	verbose: true,
	strict: true
});
