CREATE TABLE `extra_item` (
	`id` text PRIMARY KEY NOT NULL,
	`desc` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`quote_id` text NOT NULL,
	FOREIGN KEY (`quote_id`) REFERENCES `quote`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `extraItem_quoteId_idx` ON `extra_item` (`quote_id`);--> statement-breakpoint
ALTER TABLE `line_item` DROP COLUMN `sort_order`;