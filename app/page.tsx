import { signOut } from "@/actions/auth.action";
import { validateRequest } from "@/auth/lucia";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session, user } = await validateRequest()

  if (!user || !session) {
    redirect("/auth/sign-in")
  }
  redirect("/dashboard")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This will be the main dashboard</h1>
    </main>
  );
}
