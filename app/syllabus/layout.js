import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Providers } from "@/app/providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Syllabus",
};

export default async function SyllabusLayout({
  children,
  courseSyllabus,
}) {
  return (
    <>
      <Header />
      <Providers>{children}</Providers>
      <div className="md:flex md:flex-row items-center justify-center gap-10 p-2 flex-col">
        <div className="w-100">{courseSyllabus}</div>
      </div>
    </>
  );
}
