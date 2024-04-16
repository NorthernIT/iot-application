"use server";

import { db } from "@/database";
import { devices } from "@/database/schema";
import { eq } from "drizzle-orm";

export const addDevice = async (
    userid: string,
    devEUI: string,
    devName: string,
    appEUI: string,
    nwAppKey: string,
    freq: string,
    devClass: string,
) => {
    try{
        await db.insert(devices).values({
            deviceEUI: devEUI,
            userId: userid,
            deviceName: devName,
            appEUI: appEUI,
            nwAppKey: nwAppKey,
            freq: freq,
            class: devClass,
        })

        return {
            status: 200,
            message: "device added successfully!"
        }
        
    } catch (error: any) {
        return {
            status: 500,
            error: error.message || "Internal server error",
        };
    }
};

export const getUserDevices = async (userid: string) => {
    try{
        const result = await db.select({
            DevEUI: devices.deviceEUI,
            Name: devices.deviceName,
            AppEUI: devices.appEUI,
            NwAppKey: devices.nwAppKey,
            Freq: devices.freq,
            Class: devices.class
        }).from(devices).where(eq(devices.userId, userid));

        return {
            status: 200,
            results: result,
        }
    } catch (error: any) {
        return {
            status: 500,
            error: error.message || "Internal server error",
        };
    }
};