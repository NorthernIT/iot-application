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
import { generateVerificationToken } from "@/util/tokens";
import { sendVerificationEmail } from "./sendVerificationEmail";

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

        /*
          Creates verification token
          Sends email with token to be verified by user
          Token expires after an hour
    
          New tokens can be generated when a user tries to login without being verified
        */

        // generate new token
        const token = await generateVerificationToken(values.email,userID);
        // send verification email with token
        await sendVerificationEmail(values.email, token.token);


        // const session = await lucia.createSession(userID, {
        //     expiresIn: 60 * 60 * 24 * 30 // expires in 30 days.
        // })

        // const sessionCookie = lucia.createSessionCookie(session.id);

        // cookies().set(
        //     sessionCookie.name,
        //     sessionCookie.value,
        //     sessionCookie.attributes
        // )

        return {
            success: true,
            message: `Verification email sent to ${values.email}`,
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
            status: 400,
            error: "User not found",
        }
    }

    if (!existingUser.hashedPassword) {
        return {
            status: 400,
            error: "User not found",
        }
    }

    const isValidPassword = await new Argon2id().verify(
        existingUser.hashedPassword,
        values.password,
    )

    if (!isValidPassword) {
        return {
            status: 400,
            error: "Incorrect username or password",
        }
    }

    if (!existingUser.verifiedEmail){
        return {
            status: 403,
            error: "Please check your email for verification and verify your account"
        }
    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30 // expires in 30 days.
    })

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return {
        status: 200,
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