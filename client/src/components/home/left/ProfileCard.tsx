import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import Image from "next/image";

const ProfileCard = () => {
  const user_id = 1;
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-6 justify-between shadow-md">
      {/* IMAGE CONTAINER */}
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/133633/pexels-photo-133633.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="profile cover image"
          fill
          className="rounded-lg object-cover z-1"
        />
        <Image
          src="https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="profile cover image"
          height={64}
          width={64}
          className="w-16 h-16 object-cover absolute top-full left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white z-10"
        />
      </div>

      {/* USER DETAILS */}
      <div className="pt-4 flex flex-col items-center gap-2 capitalize">
        <span className="text-gray-700 text-xl">Sasindu dilshan</span>
        <div className="flex gap-2">
          <Image
            src="https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=600"
            width={16}
            height={16}
            alt="icon image"
            className="w-4 h-4 object-cover rounded-full"
          />
          <span className="text-sm text-blue-500">500 followers</span>
        </div>
      </div>

      {/* PROFILE BUTTON */}
      <ProgressLink
        href={`/profile/${user_id}`}
        className="custom-btn-bg p-2 text-base capitalize text-white flex items-center justify-center rounded-lg"
      >
        my profile
      </ProgressLink>
    </div>
  );
};

export default ProfileCard;
