import Image from "next/image";

const CenterProileCard = () => {
  return (
    <div className="w-full p-4 bg-white rounded-lg flex flex-col gap-6 justify-between shadow-md">
      {/* IMAGE CONTAINER */}
      <div className="h-60 relative">
        <Image
          src="https://images.pexels.com/photos/133633/pexels-photo-133633.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="profile cover image"
          fill
          className="rounded-lg object-cover z-1"
        />
        <Image
          src="https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="profile cover image"
          height={112}
          width={112}
          className="w-28 h-28 object-cover absolute top-full left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white z-10"
        />
      </div>

      {/* USER DETAILS */}
      <div className="pt-10 flex flex-col items-center gap-6 capitalize">
        <span className="text-gray-700 text-xl font-bold">Sasindu dilshan</span>

        {/* OTHER DETAILS followers, following, posts */}
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-700 text-base font-bold">142</span>
            <span className="text-gray-500 text-sm">posts</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-700 text-base font-bold">1.2k</span>
            <span className="text-gray-500 text-sm">followers</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-700 text-base font-bold">1.4k</span>
            <span className="text-gray-500 text-sm">following</span>
          </div>
        </div>
      </div>

      {/* PROFILE BUTTON */}
    </div>
  );
};

export default CenterProileCard;
