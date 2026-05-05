CREATE TABLE `line_item` (
	`id` text PRIMARY KEY NOT NULL,
	`desc` text NOT NULL,
	`quantity` real NOT NULL,
	`unit` text,
	`unit_price_cents` integer NOT NULL,
	`sort_order` integer NOT NULL,
	`quote_id` text NOT NULL,
	FOREIGN KEY (`quote_id`) REFERENCES `quote`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `quote` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`desc` text,
	`user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
