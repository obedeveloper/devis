import { integer, sqliteTable, text, real, index } from 'drizzle-orm/sqlite-core';
import { user } from './auth';

export const quote = sqliteTable(
	'quote',
	{
		id: text('id')
			.primaryKey()
			.$default(() => crypto.randomUUID()),
		title: text('title').notNull(),
		desc: text('desc'),
		currency: text('currency').notNull().default('RWF'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		createdAt: integer('created_at')
			.$default(() => Date.now())
			.notNull()
	},
	(table) => [index('quote_userId_idx').on(table.userId)]
);

export const lineItem = sqliteTable(
	'line_item',
	{
		id: text('id')
			.primaryKey()
			.$default(() => crypto.randomUUID()),
		desc: text('desc').notNull(),
		quantity: real('quantity').notNull().default(1),
		unit: text('unit'),
		unitPriceCents: integer('unit_price_cents').notNull(),
		sortOrder: integer('sort_order').notNull().default(1),
		quoteId: text('quote_id')
			.notNull()
			.references(() => quote.id, { onDelete: 'cascade' })
	},
	(table) => [index('lineItem_quoteId_idx').on(table.quoteId)]
);
