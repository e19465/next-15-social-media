import NOT_FOUND_IMG from "../../public/notfound.png";
import Image from "next/image";
import { ProgressLink } from "@/components/nprogress/NProgressHandler";

const NotFound = () => {
  return (
    <section className="fixed top-0 left-0 z-[1000] w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <Image
        src={NOT_FOUND_IMG}
        alt="Not Found"
        priority
        className="w-[30%] md:w-[30%] h-auto object-contain mb-6"
      />
      <ProgressLink
        href="/"
        className="px-6 py-3 rounded-lg shadow-md bg-img-gradient-blue-purple text-white transition-colors duration-300"
      >
        Back to Home
      </ProgressLink>
    </section>
  );
};

export default NotFound;
