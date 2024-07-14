"use client";

import PostDeleteModel from "@/components/models/PostDeleteModel";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostDeleteButton = ({ postId }: { postId: number }) => {
  // Hooks
  const router = useRouter();

  // States
  const [isPostDeleteModelOpen, setPostDeleteModelOpen] =
    useState<boolean>(false);

  const [isPostDeleteLoading, setIsPostDeleteLoading] =
    useState<boolean>(false);

  return (
    <>
      <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
        <button
          type="button"
          title="delete the post"
          onClick={() => setPostDeleteModelOpen(true)}
        >
          🗑️
        </button>
      </div>
      {isPostDeleteModelOpen && (
        <PostDeleteModel
          setPostDeleteModelOpen={setPostDeleteModelOpen}
          postId={postId}
          isPostDeleteLoading={isPostDeleteLoading}
          setIsPostDeleteLoading={setIsPostDeleteLoading}
          router={router}
        />
      )}
    </>
  );
};

export default PostDeleteButton;
