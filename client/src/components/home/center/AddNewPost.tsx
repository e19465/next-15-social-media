import Image from "next/image";

const AddNewPost = () => {
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
        <div className="flex gap-4">
          <textarea
            name="add-post-text-area"
            id="add-post-text-area"
            title="add-post-text-area"
            placeholder="What's on your mind?"
            className="w-full h-20 p-2 bg-slate-100 rounded-lg resize-none flex-1 outline-blue-500"
          />
          <Image
            src="/emoji.png"
            alt="select an emoji"
            width={24}
            height={24}
            className="w-5 h-5 object-cover rounded-full cursor-pointer self-end"
          />
        </div>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-6 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addimage.png"
              alt="add image"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>Photo</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addVideo.png"
              alt="add image"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/poll.png"
              alt="add image"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>Poll</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              alt="add image"
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
