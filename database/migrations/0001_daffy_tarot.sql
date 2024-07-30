CREATE TABLE `comfortSensor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceEUI` varchar(255) NOT NULL,
	`HUMIDITY` float NOT NULL,
	`TEMPERATURE` float NOT NULL,
	`battery_voltage` float NOT NULL,
	`port` int NOT NULL,
	`raw` varchar(255) NOT NULL,
	CONSTRAINT `comfortSensor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`deviceEUI` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`devName` varchar(255) NOT NULL,
	`appEUI` varchar(255) NOT NULL,
	`nwAppKey` varchar(255) NOT NULL,
	`freq` varchar(255) NOT NULL,
	`class` varchar(255) NOT NULL,
	CONSTRAINT `devices_deviceEUI` PRIMARY KEY(`deviceEUI`)
);
--> statement-breakpoint
CREATE TABLE `draginoSensor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceEUI` varchar(255) NOT NULL,
	`BatV` float NOT NULL,
	`Bat_status` float NOT NULL,
	`Ext_sensor` varchar(255),
	`Hum_SHT` float NOT NULL,
	`TempC_DS` float NOT NULL,
	`TempC_SHT` float NOT NULL,
	`lora_datarate` varchar(255),
	`lora_rssi` float NOT NULL,
	`lora_snr` float NOT NULL,
	CONSTRAINT `draginoSensor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_verification` (
	`id` varchar(15) NOT NULL,
	`email` varchar(100) NOT NULL,
	`token` varchar(100) NOT NULL,
	`active_expires` bigint NOT NULL,
	CONSTRAINT `email_verification_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_verification_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `netvoxSensor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceEUI` varchar(255) NOT NULL,
	`BATTERY` float NOT NULL,
	`TEMPERATURE` float NOT NULL,
	`ILLUMINANCE` float NOT NULL,
	`OCCUPIED` boolean NOT NULL,
	`LORA_RSSI` float NOT NULL,
	`LORA_SNR` float NOT NULL,
	`LORA_DATARATE` float NOT NULL,
	CONSTRAINT `netvoxSensor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` varchar(15) NOT NULL,
	`email` varchar(100) NOT NULL,
	`active_expires` bigint NOT NULL,
	`token` varchar(100) NOT NULL,
	CONSTRAINT `password_reset_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `password_reset_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
ALTER TABLE `devices` ADD CONSTRAINT `devices_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;