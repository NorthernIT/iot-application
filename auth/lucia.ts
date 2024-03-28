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

// Used to validate user sessions
export const validateRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

	if (!sessionId) return {
        user: null,
        session: null,
    }

	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}
	return {
        user,
        session,
    }
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