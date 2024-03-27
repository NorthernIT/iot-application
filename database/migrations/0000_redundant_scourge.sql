CREATE TABLE `user_sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `user_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(15) NOT NULL,
	`email` varchar(100) NOT NULL,
	`username` varchar(50) NOT NULL,
	`verified_email` boolean NOT NULL DEFAULT false,
	`hashed_password` varchar(255) NOT NULL,
	`apiKey` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `user_sessions` ADD CONSTRAINT `user_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;