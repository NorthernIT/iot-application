import Navbar from "@/components/Navbar";

export default function SignedInLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Navbar />
      <div>
        {children}
      </div>
    </html>
  );
}
