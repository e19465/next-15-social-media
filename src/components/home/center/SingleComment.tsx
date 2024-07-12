"use client";
import { Comment, Like, ReplyComment, User } from "@prisma/client";
import Image from "next/image";
import { switchCommentLikes } from "@/lib/actions";
import { useOptimistic, useState } from "react";
import ReplyComments from "./ReplyComments";

//! image imports
import LIKED_IMAGE from "../../../../public/liked.png";
import LIKE_IMAGE from "../../../../public/like.png";

//! types
type ReplyCommentProps = ReplyComment & {
  user: User;
  likes: Like[];
};

type SingleCommentProps = Comment & {
  user: User;
  likes: Like[];
  replies: ReplyCommentProps[];
  _count: {
    likes: number;
  };
};

//! SingleComment component
const SingleComment = ({ comment }: { comment: SingleCommentProps }) => {
  // find the current user liked to the comment or not
  const userId = comment.user.id;
  const usersLike = comment.likes.find((like) => like.userId === userId);

  // check if the user liked the comment or not and the like count
  const isUserLiked = usersLike ? true : false;
  const likeCount = comment._count.likes;

  // states
  const [currentUserLikedAndCount, setCurrentUserLikedAndCount] = useState({
    isLiked: isUserLiked,
    likeCount: likeCount,
  });
  const [isReplyComponentOpen, setIsReplyComponentOpen] =
    useState<boolean>(false);

  // optimistic UI state
  const [optimisticLikeAndCountState, setOptimisticLikeAndCountState] =
    useOptimistic(currentUserLikedAndCount, (prev) => {
      return {
        ...prev,
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      };
    });

  // handle comment likes and like count
  const handleCommentLikesAndLikeCount = async () => {
    // optimistic UI for like and like count
    setOptimisticLikeAndCountState("");

    // action to like or dislike the comment in the database
    try {
      const response = await switchCommentLikes(comment.id, userId);
      if (response === "liked") {
        setCurrentUserLikedAndCount((prev) => ({
          ...prev,
          isLiked: true,
          likeCount: prev.likeCount + 1,
        }));
      } else if (response === "disliked") {
        setCurrentUserLikedAndCount((prev) => ({
          ...prev,
          isLiked: false,
          likeCount: prev.likeCount - 1,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-start gap-4">
      {/* COMMENT OWNER IMAGE */}
      <Image
        src={comment.user.avatar || "/noAvatar.png"}
        alt={`${comment.user.username}'s profile photo`}
        width={32}
        height={32}
        className="w-8 h-8 object-cover rounded-full"
      />

      {/*  COMMENT DETAILS SETION */}
      <div className="flex flex-col flex-1">
        <span className="font-medium text-sm text-gray-500">
          {comment.user.username}
        </span>
        <p className="text-xs text-gray-700">{comment.text}</p>

        {/* COMMENT LIKE AND REPLY */}
        <div className="flex items-center gap-4 text-xs mt-2">
          <div className="flex items-center gap-2 p-2 rounded-xl">
            <Image
              src={
                optimisticLikeAndCountState.isLiked ? LIKED_IMAGE : LIKE_IMAGE
              }
              alt="like the comment"
              title="Like the comment"
              width={16}
              height={16}
              className="object-contain cursor-pointer"
              onClick={handleCommentLikesAndLikeCount}
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {optimisticLikeAndCountState.likeCount}
            </span>
            <span className="text-gray-400 hidden md:inline">Likes</span>
          </div>
          <button
            type="button"
            title="Reply to this comment"
            className="text-xs text-gray-500 cursor-pointer bg-transparent outline-none border-none"
            onClick={() => setIsReplyComponentOpen(true)}
          >
            Reply
          </button>
        </div>
      </div>

      {/* MORE OPTIONS EMOJI */}
      <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
        <Image
          src="/more.png"
          alt="comment options"
          title="Comment options"
          width={16}
          height={16}
          className="object-contain"
        />
      </div>
      <ReplyComments
        replies={comment.replies}
        isReplyComponentOpen={isReplyComponentOpen}
        setIsReplyComponentOpen={setIsReplyComponentOpen}
      />
    </div>
  );
};

export default SingleComment;
