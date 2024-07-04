import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Providers } from "@/app/providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children, weekNotice, allNotice }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header />
        <Providers>{children}</Providers>

        <div className="md:flex md:flex-row items-center justify-center gap-10 p-2 flex-col">
          <div className="w-50">{weekNotice}</div>
          <div className="w-50">{allNotice}</div>
        </div>
      </body>
    </html>
  );
}
