"use client";

import NOT_FOUND_IMG from "../../public/notfound.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <Image
        src={NOT_FOUND_IMG}
        alt="Not Found"
        priority
        className="w-[30%] md:w-[30%] h-auto object-contain mb-6"
      />
      <button
        type="button"
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Back to Home
      </button>
    </section>
  );
};

export default NotFound;
