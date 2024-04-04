import { signOut } from "@/actions/auth.action";
import { validateRequest } from "@/auth/lucia";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { session, user } = await validateRequest()

  if (!user || !session) {
    redirect("/auth/sign-in")
  }
  return (
    <main style={{ display: "flex", justifyContent: "center", height: "100vh", backgroundColor: "blue"}}>
      <h1>This will be the main dashboard</h1>
    </main>
  );
}