import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import Image from "next/image";

const SingleBirthday = () => {
  return (
    <div className="w-full p-2 gap-2 flex items-center justify-center">
      {/* SENDER IMAGE */}
      <div className="flex items-center justify-center">
        <Image
          src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="friend request sender image"
          width={32}
          height={32}
          className="w-8 h-8 object-cover rounded-full"
        />
      </div>

      {/* SENDER NAME */}
      <div className="flex items-center justify-start flex-1 overflow-hidden">
        <span className="font-medium text-sm">John David</span>
      </div>

      {/* OPTIONS */}
      <ProgressLink
        href="/"
        className="py-1 px-2 rounded-md shadow-md custom-btn-bg text-white text-xs"
      >
        celebrate
      </ProgressLink>
    </div>
  );
};

export default SingleBirthday;
