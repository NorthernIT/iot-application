"use server"
import { z } from "zod";
import { SignUpSchema } from "@/components/SignUpForm";
import { db } from "@/database/index";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import * as crypto from "crypto";
import { user } from "@/database/schema";

function genAPIKey(): string {
    const apiKeyLength: number = 32; // Length of key
    const apiKey: string = crypto.randomBytes(apiKeyLength).toString('hex');
    return apiKey;
}

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    console.log(values);

    const hashedPassword = await new Argon2id().hash(values.password)
    const userID = generateId(15)
    const apiKey = genAPIKey() 

    await db.insert(user).values({
        id: userID,
        email: values.email.toLowerCase(),
        username: values.username,
        hashedPassword: hashedPassword,
        apiKey: apiKey
    });
}