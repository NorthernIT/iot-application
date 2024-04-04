import { signOut } from "@/actions/auth.action";
import { validateRequest } from "@/auth/lucia";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import UserProfile from "@/components/userProfile";

export default async function profilePage() {
    const { session, user } = await validateRequest()

    if (!user || !session ) {
        redirect("/auth/sign-in")
    }
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "blue"}}>
            <UserProfile user={user} />
        </main>
    );
}