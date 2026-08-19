import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

export const quote = sqliteTable(
	'quote',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		title: text('title').notNull(),
		description: text('description'),
		notes: text('notes'),
		currency: text('currency').default('RWF'),
		createdAt: integer('created_at')
			.notNull()
			.$defaultFn(() => Date.now()),
		updatedAt: integer('updated_at'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' })
	},
	(table) => [index('quote_userId_idx').on(table.userId)]
);

export const lineItem = sqliteTable('line_item', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	description: text('description').notNull(),
	quantity: integer('quantity').notNull().default(1),
	unit: text('unit'),
	unitPrice: integer('unit_price').notNull().default(0),
	quoteId: text('quote_id')
		.notNull()
		.references(() => quote.id, { onDelete: 'cascade' })
});

export const extraItem = sqliteTable('extra_item', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	description: text('description').notNull(),
	amount: integer('amount').notNull().default(0),
	quoteId: text('quote_id')
		.notNull()
		.references(() => quote.id, { onDelete: 'cascade' })
});
