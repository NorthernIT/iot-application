"use server";

import { db } from "@/database";
import { netvoxSensor } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

// get most recent entry in netvox table
export const getLatestNetvoxData = async () => {
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

// get all times of netvox table entries for dropdown
export const getNetvoxTimes = async () => {
    try {
        const result = await db.select({
            time: netvoxSensor.time
        }).from(netvoxSensor).orderBy(desc(netvoxSensor.time));

        return {
            status: 200,
            result: result,
        }

    } catch (error:any){
        return {
            status: 500,
            error: error.message || "Internal server error",
        }
    }
};

// get specific netvox entry based on certain time.
export const getNetvoxData = async (time: Date) => {
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
        }).from(netvoxSensor).where(eq(netvoxSensor.time, time));

        return {
            status: 200,
            result: result,
        }

    } catch (error:any){
        return {
            status: 500,
            error: error.message || "Internal server error",
        }
    }
}
