import { adapter } from "@/database";
import { Lucia, TimeSpan, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (data: any) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: data.username,
            email: data.email,
            apiKey: data.apiKey,
            verifiedEmail: data.verifiedEmail,
		};
	},
});

declare module Lucia {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
    email: string;
    apiKey: string;
    verifiedEmail: boolean;
}