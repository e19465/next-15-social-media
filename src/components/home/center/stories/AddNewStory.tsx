import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { startTransition, useState } from "react";
import { addNewStory } from "@/lib/actions";
import Image from "next/image";
import { User } from "@prisma/client";
import { toast } from "react-toastify";
import exp from "constants";

type AddNewStoryProps = {
  currentUser: User;
  setStoryList: (value: any) => void;
  setOptimisticStories: (value: any) => void;
};

const AddNewStory = ({
  currentUser,
  setStoryList,
  setOptimisticStories,
}: AddNewStoryProps) => {
  // image state
  const [imageUrl, setImageUrl] = useState<string>("");

  // Set the post image URL
  const handleSetPostImageURL = (
    info: CloudinaryUploadWidgetInfo | string | undefined
  ) => {
    if (info !== undefined && typeof info !== "string") {
      setImageUrl(info.secure_url);
    }
  };

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!imageUrl) {
      toast.error("Please select an image to post");
      return;
    }

    // optimistic UI update
    const dummyStory = {
      id: Math.random(),
      userId: currentUser.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      img: imageUrl,
      user: currentUser,
    };
    const imageUrlAvailable = imageUrl;

    startTransition(() => {
      setOptimisticStories(dummyStory);
    });
    setImageUrl("");

    // actual story creation
    try {
      const newStory = await addNewStory(currentUser.id, imageUrl);
      setStoryList((prev: any) => {
        const newState = prev.filter(
          (story: any) => story.userId !== currentUser.id
        );
        return [newStory, ...newState];
      });
      setImageUrl("");
    } catch (err) {
      setImageUrl(imageUrlAvailable);
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleAddPost}
      className="flex-shrink-0 flex flex-col items-center gap-2"
    >
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
              className="flex items-center gap-2 cursor-pointer "
              onClick={() => open()}
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="user story image"
                      priority
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-full ring-2 ring-offset-2"
                    />
                  ) : (
                    <span className="w-full h-full rounded-full ring-2 ring-offset-2 shadow-lg text-[30px] flex items-center justify-center bg-blue-50 text-blue-700">
                      +
                    </span>
                  )}
                </>
              </div>
            </div>
          );
        }}
      </CldUploadWidget>

      {imageUrl ? (
        <button className="text-xs text-blue-500 pt-1" type="submit">
          post
        </button>
      ) : (
        <span className="font-medium text-xs">Add Story</span>
      )}
    </form>
  );
};

export default AddNewStory;
