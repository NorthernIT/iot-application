import { boolean, datetime,  mysqlTable, bigint, varchar, text, int,float, timestamp} from "drizzle-orm/mysql-core";

export const user = mysqlTable("users", {
    // Lucia attributes
    id: varchar("id", {length: 15,}).primaryKey(),
    // Custom user attributes
    email: varchar("email", { length: 100 }).notNull().unique(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    verifiedEmail: boolean("verified_email").default(false).notNull(),
    hashedPassword: varchar("hashed_password", {length: 255,}).notNull(),
    apiKey: varchar("apiKey", {length: 255,}).notNull()
});

export const emailVerification = mysqlTable("email_verification", {
    id: varchar("id", {length: 15}).primaryKey(),
    email: varchar("email", { length: 100 }).notNull(),
    token: varchar("token", { length: 100 }).unique().notNull(),
    expires: bigint("active_expires", {
        mode: "number",
    }).notNull(),
});

export const passwordResetToken = mysqlTable("password_reset_tokens", {
    id: varchar("id", {
        length: 15,
    }).primaryKey(),
    email: varchar("email", { length: 100 }).notNull(),
    expires: bigint("active_expires", {
        mode: "number",
    }).notNull(),
    token: varchar("token", { length: 100 }).unique().notNull(),
});

export const session = mysqlTable("user_sessions", {
    id: varchar("id", {length: 255}).primaryKey(),
    userId: varchar("user_id", {length: 255}).notNull().references(() => user.id),
    expiresAt: datetime("expires_at").notNull()
});

export const devices = mysqlTable("devices", {
    deviceEUI: varchar("deviceEUI", {length: 255}).primaryKey(),
    userId: varchar("user_id", {length: 255}).notNull().references(() => user.id),
    deviceName: varchar("devName", {length:255}).notNull(),
    appEUI: varchar("appEUI", {length:255}).notNull(),
    nwAppKey: varchar("nwAppKey", {length:255}).notNull(),
    freq: varchar("freq", {length:255}).notNull(),
    class: varchar("class", {length:255}).notNull()
})

// Below is tables for each device that would be used.
export const draginoSensor = mysqlTable("draginoSensor", {
    id: int("id").autoincrement().primaryKey(),
    time: timestamp("time").notNull().defaultNow(),
    deviceEUI: varchar("deviceEUI", {length: 255}).notNull(),
    BatV: float("BatV").notNull(),
    Bat_status: float("Bat_status").notNull(),
    Ext_sensor: varchar("Ext_sensor", {length: 255}),
    Hum_SHT: float("Hum_SHT").notNull(),
    TempC_DS: float("TempC_DS").notNull(),
    TempC_SHT: float("TempC_SHT").notNull(),
    lora_datarate: varchar("lora_datarate", {length:255}),
    lora_rssi: float("lora_rssi").notNull(),
    lora_snr: float("lora_snr").notNull()
});

export const comfortSensor = mysqlTable("comfortSensor", {
    id: int("id").autoincrement().primaryKey(),
    time: timestamp("time").notNull().defaultNow(),
    deviceEUI: varchar("deviceEUI", {length: 255}).notNull(),
    HUMIDITY: float("HUMIDITY").notNull(),
    TEMPERATURE: float("TEMPERATURE").notNull(),
    battery_voltage: float("battery_voltage").notNull(),
    port: int("port").notNull(),
    raw: varchar("raw", {length:255}).notNull()
});

export const netvoxSensor = mysqlTable("netvoxSensor", {
    id: int("id").autoincrement().primaryKey(),
    time: timestamp("time").notNull().defaultNow(),
    deviceEUI: varchar("deviceEUI", {length: 255}).notNull(),
    BATTERY: float("BATTERY").notNull(),
    TEMPERATURE: float("TEMPERATURE").notNull(),
    ILLUMINANCE: float("ILLUMINANCE").notNull(),
    OCCUPIED: boolean("OCCUPIED").notNull(),
    LORA_RSSI: float("LORA_RSSI").notNull(),
    LORA_SNR: float("LORA_SNR").notNull(),
    LORA_DATARATE: float("LORA_DATARATE").notNull()
});