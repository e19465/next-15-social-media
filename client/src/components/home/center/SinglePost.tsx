import Image from "next/image";
import PostInteraction from "./PostInteraction";
import PostComments from "./PostComments";

const SinglePost = () => {
  return (
    <div className="">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="post owner profile photo"
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-medium text-gray-500 text-sm">John Doe</span>
        </div>
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
      {/* DESCRIPTION */}
      <div className="flex flex-col">
        {/* POST IMAGE */}
        <div className="w-full h-auto px-0 pt-4 pb-2">
          <Image
            src="https://images.pexels.com/photos/21377808/pexels-photo-21377808/free-photo-of-a-woman-wearing-a-colorful-costume-at-a-festival.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="post image"
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        {/* POST DESCRIPTION */}
        <div className="w-full h-auto px-0 py-0">
          <span className="font-medium text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </span>
        </div>
      </div>
      {/* INTERACTION */}
      <div className="w-full h-auto mt-4">
        <PostInteraction />
      </div>

      {/* COMMENTS */}
      <div className="w-full h-auto mt-4">
        <PostComments />
      </div>
    </div>
  );
};

export default SinglePost;
