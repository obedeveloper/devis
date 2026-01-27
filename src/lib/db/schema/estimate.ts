import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { user } from './auth';

export const estimate = sqliteTable(
	'estimate',
	{
		id: text('id')
			.primaryKey()
			.$default(() => crypto.randomUUID()),
		title: text('title').notNull(),
		description: text('description'),
		currency: text('currency')
			.notNull()
			.$default(() => 'RWF'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		createdAt: integer('created_at')
			.notNull()
			.$default(() => Date.now()),
		updatedAt: integer('updated_at')
			.notNull()
			.$default(() => Date.now())
	},
	(estimate) => [index('estimate_userId_idx').on(estimate.userId)]
);

export const item = sqliteTable(
	'item',
	{
		id: text('id')
			.primaryKey()
			.$default(() => crypto.randomUUID()),
		name: text('name').notNull(),
		quantity: integer('quantity')
			.notNull()
			.$default(() => 1),
		unitMeasure: text('unit_measure'),
		unitPrice: integer('unit_price')
			.notNull()
			.$default(() => 0),
		sortOrder: integer('sort_order')
			.notNull()
			.$default(() => 0),
		estimateId: text('estimate_id')
			.notNull()
			.references(() => estimate.id, { onDelete: 'cascade' })
	},
	(item) => [index('item_estimateId_idx').on(item.estimateId)]
);
