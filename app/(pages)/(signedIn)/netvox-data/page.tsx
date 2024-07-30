import { validateRequest } from "@/auth/lucia";
import { redirect } from "next/navigation";
import NetvoxData from "@/components/NetvoxData";

export default async function deviceData() {
    const { session, user } = await validateRequest()

    if (!user || !session ) {
        redirect("/auth/sign-in")
    }

    return(
        <main className="flex justify-center items-center h-screen bg-teal-500">
            <NetvoxData/>
        </main>
    )

}