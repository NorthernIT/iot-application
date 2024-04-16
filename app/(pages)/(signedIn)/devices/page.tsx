import { validateRequest } from "@/auth/lucia";
import { redirect } from "next/navigation";
import UserDevices from "@/components/userDevices"

export default async function devices() {
    const { session, user } = await validateRequest()

    if (!user || !session ) {
        redirect("/auth/sign-in")
    }

    return(
        <main className="flex justify-center items-center h-screen bg-teal-500">
            <UserDevices user = {user} />
        </main>
    )
}