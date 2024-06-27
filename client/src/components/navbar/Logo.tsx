import Link from "next/link";

const Logo = () => {
  return (
    <div className="block p-1 shadow-md rounded-md sm:w-full w-3/4">
      <Link
        className="w-full h-full flex items-center justify-center no-underline blue-gradient_text text-sm md:text-xl font-bold"
        href="/"
      >
        SDSOCIAL
      </Link>
    </div>
  );
};

export default Logo;
