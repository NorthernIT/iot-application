ALTER TABLE `comfortSensor` ADD `time` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `draginoSensor` ADD `time` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `netvoxSensor` ADD `time` timestamp DEFAULT (now()) NOT NULL;