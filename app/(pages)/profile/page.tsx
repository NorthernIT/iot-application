import { signOut } from "@/actions/auth.action";
import { validateRequest } from "@/auth/lucia";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function profilePage() {
    const { session, user } = await validateRequest()

    if (!user || !session ) {
        redirect("/sign-in")
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Protected route</p>
        <p>{JSON.stringify(user)}</p>
        <form action={signOut}>
            <Button type="submit">Sign out</Button>
        </form>
        </main>
    );
}