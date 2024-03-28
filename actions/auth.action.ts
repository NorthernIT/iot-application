"use server"
import { z } from "zod";
import { SignUpSchema } from "@/components/SignUpForm";
import { db } from "@/database/index";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import * as crypto from "crypto";
import { user } from "@/database/schema";
import { lucia, validateRequest } from "@/auth/lucia";
import { cookies } from "next/headers";
import { SignInSchema } from "@/components/SignInForm";
import { eq } from "drizzle-orm"

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

    try{
        await db.insert(user).values({
            id: userID,
            email: values.email.toLowerCase(),
            username: values.username,
            hashedPassword: hashedPassword,
            apiKey: apiKey
        })

        const session = await lucia.createSession(userID, {
            expiresIn: 60 * 60 * 24 * 30 // expires in 30 days.
        })

        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return {
            success: true,
            data: {
                userID,
            },
        }



    } catch (error: any){
        return {
            error: error?.message,
        }
    }
    
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
    const existingUser = await db.query.user.findFirst({
        where: (table) => eq(table.username,values.username),
    })

    if (!existingUser) {
        return {
            error: "User not found",
        }
    }

    if (!existingUser.hashedPassword) {
        return {
            error: "User not found",
        }
    }

    const isValidPassword = await new Argon2id().verify(
        existingUser.hashedPassword,
        values.password,
    )

    if (!isValidPassword) {
        return {
            error: "Incorrect username or password",
        }
    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30 // expires in 30 days.
    })

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return {
        success: "Logged in successfully",
    }
}

export const signOut = async () => {
    try{
        const { session } = await validateRequest()

        if (!session) {
            return {
                error: "Unauthorized",
            }
        }

        await lucia.invalidateSession(session.id)

        const sessionCookie = lucia.createBlankSessionCookie()

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        )
    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}