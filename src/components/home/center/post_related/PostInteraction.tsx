"use client";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { Like, Post, User, Comment, ReplyComment } from "@prisma/client";
import { switchLike } from "@/lib/actions";
import { toast } from "react-toastify";

//! image imports
import LIKED_IMAGE from "../../../../../public/liked.png";
import LIKE_IMAGE from "../../../../../public/like.png";

//! define types for the props
type PostInteractionProps = Post & {
  user: User;
  likes: {
    userId: string;
  }[];
  _count: {
    comments: number;
  };
};

const PostInteraction = ({
  post,
  optimisticCommentsLength,
}: {
  post: PostInteractionProps;
  optimisticCommentsLength: number;
}) => {
  // variables
  const likesArray = post?.likes;
  const ownerId = post?.userId;
  const likeCount = likesArray?.length;

  // check user is liked the post or not
  const isLiked = likesArray?.find((like) => like.userId === ownerId);

  // states
  const [likeAndLikeCount, setLikeAndLikeCount] = useState<any>({
    isLiked: isLiked,
    likeCount: likeCount,
  });

  // optimistic UI state
  const [optimisticLikeAndCountState, setOptimisticLikeAndCountState] =
    useOptimistic(likeAndLikeCount, (prev) => {
      return {
        ...prev,
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      };
    });

  // handle like / unlike post
  const handleLikes = async () => {
    // update the optimistic state for better user experience
    setOptimisticLikeAndCountState("");

    // actual like / unlike post in the database
    try {
      const res = await switchLike(post.id, ownerId);
      if (res == "liked") {
        setLikeAndLikeCount((prev: any) => {
          return {
            ...prev,
            isLiked: true,
            likeCount: prev.likeCount + 1,
          };
        });
      } else if (res == "unliked") {
        setLikeAndLikeCount((prev: any) => {
          return {
            ...prev,
            isLiked: false,
            likeCount: prev.likeCount - 1,
          };
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.log(err);
      return;
    }
  };

  return (
    <div className="w-full flex items-center justify-between text-sm">
      {/* LEFT SIDE */}
      <div className="flex gap-4">
        {/* LIKE */}
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
          <Image
            src={optimisticLikeAndCountState.isLiked ? LIKED_IMAGE : LIKE_IMAGE}
            alt="like the post"
            title="Like the post"
            width={16}
            height={16}
            className="object-contain cursor-pointer"
            onClick={handleLikes}
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLikeAndCountState.likeCount}
          </span>
          <span className="text-gray-400 hidden md:inline">Likes</span>
        </div>

        {/* COMMENT */}
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
          <Image
            src="/comment.png"
            alt="comment on the post"
            title="Comment on the post"
            width={16}
            height={16}
            className="object-contain cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">{optimisticCommentsLength}</span>
          <span className="text-gray-400 hidden md:inline">Comments</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="">
        {/* SHARE */}
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
          <Image
            src="/shareicon.png"
            alt="share the post"
            title="Share the post"
            width={20}
            height={20}
            className="object-contain cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">123</span>
          <span className="text-gray-400 hidden md:inline">Shares</span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
