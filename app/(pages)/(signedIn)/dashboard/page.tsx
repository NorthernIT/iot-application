import { validateRequest } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const { session, user } = await validateRequest()

  if (!user || !session) {
    redirect("/auth/sign-in")
  }
  return (
    <main className="flex justify-center items-center h-screen bg-teal-500">
      <div className="flex space-x-8">
        <Link href="/devices" className="inline-block bg-white rounded-lg py-8 px-8 shadow-lg hover:shadow-xl transition duration-300">
          Devices
        </Link>
        <Link href="/netvox-data" className="inline-block bg-white rounded-lg py-8 px-8 shadow-lg hover:shadow-xl transition duration-300">
          Netvox Data
        </Link>
      </div>
    </main>
  );
}