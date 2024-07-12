import Image from "next/image";

//! image imports
import LIKED_IMAGE from "../../../../public/liked.png";
import LIKE_IMAGE from "../../../../public/like.png";
import { Like, ReplyComment, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { useAuth } from "@clerk/nextjs";

type ReplyCommentProps = ReplyComment & {
  user: User;
  likes: Like[];
};

const SingleReply = ({ reply }: { reply: ReplyCommentProps }) => {
  // get the current user id
  const { userId: currentUserId } = useAuth();
  if (!currentUserId) return null;

  // variables
  const replyLikeCount = reply.likes.length;
  const currentUserLike = reply.likes.find(
    (like) => like.userId === currentUserId
  );
  const isCurrentUserLiked = currentUserLike ? true : false;

  // states
  const [isCurrentUserLikedAndLikeCount, setIsCurrentUserLikedAndLikeCount] =
    useState({
      isLiked: isCurrentUserLiked,
      likeCount: replyLikeCount,
    });

  // optimistic UI state for like and like count
  const [optimisticLikeAndCountState, setOptimisticLikeAndCountState] =
    useOptimistic(isCurrentUserLikedAndLikeCount, (prev) => {
      return {
        ...prev,
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      };
    });

  // handle comment likes and like count
  const handleCommentLikesAndLikeCount = async () => {};

  return (
    <div className="flex flex-col flex-1">
      <div className="flex py-2 items-start gap-2">
        <Image
          src={reply.user.avatar || "/noAvatar.png"}
          alt="like the comment"
          title="Like the comment"
          width={16}
          height={16}
          className="object-contain cursor-pointer"
          //   onClick={handleCommentLikesAndLikeCount}
        />
        <span className="font-medium text-sm text-gray-500">
          {reply.user.username}
        </span>
      </div>
      <p className="text-xs text-gray-700">{reply.text}</p>

      {/* COMMENT LIKE AND REPLY */}
      <div className="flex items-center gap-4 text-xs mt-2">
        <div className="flex items-center gap-2 p-2 rounded-xl">
          <Image
            src={
              isCurrentUserLikedAndLikeCount.isLiked ? LIKE_IMAGE : LIKED_IMAGE
            }
            alt="like the comment"
            title="Like the comment"
            width={16}
            height={16}
            className="object-contain cursor-pointer"
            //   onClick={handleCommentLikesAndLikeCount}
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {isCurrentUserLikedAndLikeCount.likeCount}
          </span>
          <span className="text-gray-400 hidden md:inline">Likes</span>
        </div>
      </div>
    </div>
  );
};

export default SingleReply;
