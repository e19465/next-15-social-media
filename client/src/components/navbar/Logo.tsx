import Image from "next/image";
import { ProgressLink } from "../nprogress/NProgressHandler";

const Logo = () => {
  return (
    <div className="p-1 rounded-md sm:w-full w-3/4 flex items-center justify-center">
      <ProgressLink className="no-underline" href="/">
        <Image
          src="/logos.PNG"
          alt="logo of the website. also a link to the home page"
          width={128} // Adjust this value to match `w-32` in Tailwind CSS (128px)
          height={40} // Adjust this height accordingly
          className="w-32 h-auto object-contain"
        />
      </ProgressLink>
    </div>
  );
};

export default Logo;
