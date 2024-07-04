import HamburgerMenu from "@/components/hamburgerMenu";
import { DecodeToken } from "@/lib/decode_token";
import getRollInfo from "@/lib/getRollInfo";
import getCTInfo from "@/lib/getCTInfo";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function Header() {
  const payload = await DecodeToken();
  // const studentInfo = await getRollInfo(payload.roll)
  // const ctInfo = await  getCTInfo(studentInfo)

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">
            <Link href="/dashboard"> RUET v20.0</Link>
          </div>
          <div className="hidden md:flex">
            <Navbar accountType={payload.accountType} />
          </div>
        </div>

        <HamburgerMenu
          accountType={payload.accountType}
          userName={payload.name}
        />

        {/* User section */}
        <div className="hidden md:flex items-center space-x-2">
          <Link
            className="font-medium hover:border-white border border-transparent rounded-md p-2"
            href="/profile"
          >
            {payload.name.length > 15
              ? `${payload.name.substring(0, 15)}...`
              : payload.name}
          </Link>
        </div>
      </div>
    </header>
  );
}
