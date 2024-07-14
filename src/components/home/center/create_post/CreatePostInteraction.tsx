"use client";
import { User } from "@prisma/client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { createNewPost } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import EmojiSelector from "@/components/EmojiSelector";

type CreatePostInteractionProps = {
  currentUser: User;
};

const CreatePostInteraction = ({ currentUser }: CreatePostInteractionProps) => {
  // Hooks
  const router = useRouter();

  // states
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] =
    useState<boolean>(false);

  // Set the post image URL
  const handleSetPostImageURL = (
    info: CloudinaryUploadWidgetInfo | string | undefined
  ) => {
    if (info !== undefined && typeof info !== "string") {
      setImageUrl(info.secure_url);
    }
  };

  // Create a new post
  const handleNewPostCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description) {
      toast.error("Description is required");
      return;
    }
    setLoading(true);
    try {
      const res = await createNewPost(currentUser.id, description, imageUrl);
      if (res) {
        console.log(res);
        router.refresh();
        setDescription("");
        setImageUrl("");
        toast.success("Post published");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Failed to create a new post");
    }
  };

  return (
    <div className="flex-1">
      {/* TEXT INPUT */}

      <form onSubmit={handleNewPostCreation} className="flex gap-4">
        <textarea
          name="add-post-text-area"
          id="add-post-text-area"
          title="add-post-text-area"
          placeholder="What's on your mind?"
          className="w-full h-20 p-2 bg-slate-100 rounded-lg resize-none flex-1 outline-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center gap-2 self-end">
          <div className="relative">
            <Image
              src="/emoji.png"
              alt="select an emoji"
              title="Select an emoji"
              width={24}
              height={24}
              className="w-5 h-5 object-cover rounded-full cursor-pointer"
              onClick={() => setIsEmojiSelectorOpen((prev) => !prev)}
            />
            {isEmojiSelectorOpen && <EmojiSelector onSelect={setDescription} />}
          </div>
          <button
            type="submit"
            title="add post submit button"
            disabled={loading}
            className={`${loading && "cursor-not-allowed"}`}
          >
            {loading ? (
              <Spinner />
            ) : (
              <Image
                src="/share.png"
                alt="add new post button"
                title="Add new post button"
                width={24}
                height={24}
                className="w-5 h-5 object-cover cursor-pointer"
              />
            )}
          </button>
        </div>
      </form>
      {/* POST OPTIONS */}
      <div className="flex items-center gap-6 mt-4 text-gray-400 flex-wrap">
        {/* SELECT IMAGE TO UPLOAD */}
        <CldUploadWidget
          uploadPreset="sdsocial"
          onSuccess={(result, { widget }) => {
            handleSetPostImageURL(result?.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
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
            );
          }}
        </CldUploadWidget>

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
  );
};

export default CreatePostInteraction;
