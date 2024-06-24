import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

// const Navbar = dynamic(() =>import('@/components/Navbar'), { ssr: false })

export default function SignedInLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
