import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import Image from "next/image";
import FollowBlockUserButtons from "./FollowBlockUserButtons";

const UserInformation = ({ userId }: { userId?: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">Details</span>
        <ProgressLink className="text-blue-500 hover:underline" href="#">
          See All
        </ProgressLink>
      </div>

      {/* NAME AND USERNAME */}
      <div className="flex gap-2 items-center justify-start">
        <span className="text-base font-medium text-gray-800">John Walker</span>
        <span className="text-sm font-medium text-gray-500">@jwalker</span>
      </div>

      {/* DESCRIPTION */}
      <div className="text-sm text-gray-600">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quo
          molestias consectetur temporibus nobis molestiae reiciendis cum
          deleniti amet ullam.
        </p>
      </div>

      {/* PERSONAL INFO */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-2 w-[30%]">
            <Image
              src="/map.png"
              alt="Living Location"
              width={20}
              height={20}
            />
            <span className="text-sm text-gray-400 w-[70%]">Living in</span>
          </div>
          <span className="text-sm font-bold text-gray-600">New York, USA</span>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex items-center gap-2 w-[30%]">
            <Image
              src="/school.png"
              alt="Current School"
              width={20}
              height={20}
            />
            <span className="text-sm text-gray-400 w-[70%]">Went to</span>
          </div>
          <span className="text-sm font-bold text-gray-600">
            Oxford University
          </span>
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-2 w-[30%]">
            <Image src="/work.png" alt="Working Place" width={20} height={20} />
            <span className="text-sm text-gray-400 w-[70%]">Works at</span>
          </div>
          <span className="text-sm font-bold text-gray-600">
            Geveo Australasia
          </span>
        </div>
      </div>

      {/* PROFILE LINK AND JOINED DATE */}
      <div className="flex items-center justify-between">
        {/* PROFILE LINK */}
        <div className="flex items-center gap-2">
          <Image src="/link.png" alt="Profile Link" width={20} height={20} />
          <ProgressLink className="text-blue-500 hover:underline" href="#">
            website.com
          </ProgressLink>
        </div>

        {/* JOINED DATE */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <Image src="/date.png" alt="Joined Date" width={20} height={20} />
            <span className="text-xs text-gray-500">Joined</span>
          </div>
          <span className="text-xs text-gray-500">2 years ago</span>
        </div>
      </div>

      {/* FOLLOWING BUTTON AND BLOCK BUTTON */}
      <FollowBlockUserButtons />
    </div>
  );
};

export default UserInformation;
