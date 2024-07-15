"use server";

import { db } from "@/database";
import { netvoxSensor } from "@/database/schema";
import { desc } from "drizzle-orm";

export const getNetvoxData = async () => {
    // get most recent entry in netvox table
    try {
        const result = await db.select({
            time: netvoxSensor.time,
            BATTERY: netvoxSensor.BATTERY,
            TEMPERATURE: netvoxSensor.TEMPERATURE,
            ILLUMINANCE: netvoxSensor.ILLUMINANCE,
            OCCUPIED: netvoxSensor.OCCUPIED,
            LORA_RSSI: netvoxSensor.LORA_RSSI,
            LORA_SNR: netvoxSensor.LORA_SNR,
            LORA_DATARATE: netvoxSensor.LORA_DATARATE
        }).from(netvoxSensor).orderBy(desc(netvoxSensor.time)).limit(1);

        return {
            status: 200,
            result: result,
        }

    } catch (error: any) {
        return {
            status: 500,
            error: error.message || "Internal server error",
        };
    }

};
