import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

const AddNewPost = () => {
  const { userId } = auth();
  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm shadow-md mt-4">
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="add post image"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full hidden sm:block"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form action="" className="flex gap-4">
          <textarea
            name="add-post-text-area"
            id="add-post-text-area"
            title="add-post-text-area"
            placeholder="What's on your mind?"
            className="w-full h-20 p-2 bg-slate-100 rounded-lg resize-none flex-1 outline-blue-500"
          />
          <input type="hidden" name="userId" value={userId ?? ""} />
          <div className="flex items-center gap-2 self-end">
            <Image
              src="/emoji.png"
              alt="select an emoji"
              title="Select an emoji"
              width={24}
              height={24}
              className="w-5 h-5 object-cover rounded-full cursor-pointer"
            />
            <button type="submit" title="add post submit button">
              <Image
                src="/share.png"
                alt="add new post button"
                title="Add new post button"
                width={24}
                height={24}
                className="w-5 h-5 object-cover cursor-pointer"
              />
            </button>
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-6 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addimage.png"
              alt="post new image"
              title="Add an image"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>Photo</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addVideo.png"
              alt="post new video"
              title="Add a video"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/poll.png"
              alt="add new poll"
              title="Add a poll"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>Poll</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              alt="add new event"
              title="Add an event"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>Event</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
