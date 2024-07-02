import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import Image from "next/image";

type SingleAddProps = {
  size: "sm" | "md" | "lg";
};

const SingleAdd: React.FC<SingleAddProps> = ({ size }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="text-gray-700 text-sm">Sponsored Ads</span>
        <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
          <Image
            src="/more.png"
            alt="post options"
            width={16}
            height={16}
            className="object-contain"
          />
        </div>
      </div>

      {/* BOTTOM */}
      <div className={`flex flex-col ${size === "sm" ? "gap-2" : "gap-4"}`}>
        {/* Add's IMAGE */}
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          } `}
        >
          <Image
            src="https://images.pexels.com/photos/1058771/pexels-photo-1058771.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="post image"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* SMALL ADD'S IMAGE AND TEXT */}
        <div className="flex items-center justify-start gap-4">
          <Image
            src="https://images.pexels.com/photos/1058771/pexels-photo-1058771.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="post image"
            width={24}
            height={24}
            className="rounded-full object-cover w-6 h-6"
          />
          <span className="font-medium text-sm text-gray-500">
            Flora Botique
          </span>
        </div>

        {/* Add DESCRIPTION */}
        <div className={``}>
          <p
            className={`${size === "sm" ? "text-xs" : "text-sm"} text-gray-700`}
          >
            {size === "sm"
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore reiciendis officiis quidem quos vitae sapiente voluptatum consectetur porro ad."
              : size === "md"
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore reiciendis officiis quidem quos vitae sapiente voluptatum consectetur porro ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore reiciendis officiis quidem quos vitae sapiente voluptatum consectetur porro ad."
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore reiciendis officiis quidem quos vitae sapiente voluptatum consectetur porro ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore reiciendis officiis quidem quos vitae sapiente voluptatum consectetur porro ad.Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore reiciendis officiis quidem quos vitae sapiente voluptatum consectetur porro ad."}
          </p>
        </div>

        {/* BUTTON */}
        <ProgressLink
          href="/"
          className="w-full p-2 rounded-lg shadow-md bg-gray-500 text-white transition-colors duration-300 flex items-center justify-center hover:bg-gray-600"
        >
          Learn More
        </ProgressLink>
      </div>
    </div>
  );
};

export default SingleAdd;
