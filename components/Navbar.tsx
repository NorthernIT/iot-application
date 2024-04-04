
import Image from "next/image";

import Link from "next/link";

import { validateRequest } from "@/auth/lucia";
import NavbarMenu from "./NavbarMenu";


const Navbar = async () => {
  const { user } = await validateRequest()

  return (
    <nav className="py-2">
      <div className="w-full max-w-[2160px] flex flex-row justify-between items-center gap-[1rem]">
        {/* Logo */}
        <Link href={"/dashboard"} className="w-[4rem] h-[4rem] shrink-0">
          <Image
            width={256}
            height={256}
            className="object-cover w-[4rem] h-[4rem]"
            src={"/nits.png"}
            alt={""}
          />
        </Link>
        <NavbarMenu user={user}/>
      </div>
    </nav>
  );
};

export default Navbar;
