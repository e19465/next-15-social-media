import Image from "next/image";
import { Like, ReplyComment, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { switchReplyLikes } from "@/lib/actions";

//! image imports
import LIKED_IMAGE from "../../../../../public/liked.png";
import LIKE_IMAGE from "../../../../../public/like.png";
import CoomentReplyDeleteModel from "@/components/models/CoomentReplyDeleteModel";

type ReplyCommentProps = ReplyComment & {
  user: User;
  likes: Like[];
};

const SingleReply = ({
  reply,
  postOwnerId,
  setRepliesState,
  setOptimisticCommentsLength,
  setOptimisticReplyCount,
  setTotalCommentsLength,
  setReplyCount,
  setOptimisticReplyState,
  currentUser,
}: {
  reply: ReplyCommentProps;
  postOwnerId: string;
  setRepliesState: React.Dispatch<React.SetStateAction<ReplyCommentProps[]>>;
  setOptimisticCommentsLength: (value: "increment" | "decrement") => void;
  setOptimisticReplyCount: (value: "increment" | "decrement") => void;
  setTotalCommentsLength: React.Dispatch<React.SetStateAction<number>>;
  setReplyCount: React.Dispatch<React.SetStateAction<number>>;
  setOptimisticReplyState: (action: {
    method: "increment" | "decrement";
    value: ReplyCommentProps;
  }) => void;
  currentUser: User;
}) => {
  // get the current user id
  const { userId: currentUserId } = useAuth();
  if (!currentUserId) return null;

  // variables
  const replyLikeCount = reply.likes.length;
  const currentUserLike = reply.likes.find(
    (like) => like.userId === currentUserId
  );
  const isCurrentUserLiked = currentUserLike ? true : false;
  const isAbleToDelete =
    reply.user.id === currentUserId || postOwnerId === currentUserId;

  // states
  const [isCurrentUserLikedAndLikeCount, setIsCurrentUserLikedAndLikeCount] =
    useState({
      isLiked: isCurrentUserLiked,
      likeCount: replyLikeCount,
    });
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

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
  const handleCommentLikesAndLikeCount = async () => {
    setOptimisticLikeAndCountState("");
    try {
      const res = await switchReplyLikes(reply.id, currentUserId);
      if (res === "liked") {
        setIsCurrentUserLikedAndLikeCount((prev) => {
          return {
            ...prev,
            isLiked: true,
            likeCount: prev.likeCount + 1,
          };
        });
      } else if (res === "disliked") {
        setIsCurrentUserLikedAndLikeCount((prev) => {
          return {
            ...prev,
            isLiked: false,
            likeCount: prev.likeCount - 1,
          };
        });
      }
      console.log("res", res);
    } catch (err) {
      console.error(err);
    }
  };

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
        />
        <span className="font-medium text-sm text-gray-500">
          {reply.user.username}
        </span>
      </div>
      <p className="text-xs text-gray-700">{reply.text}</p>

      {/* COMMENT LIKE AND REPLY */}
      <div className="w-full flex items-center gap-4 text-xs mt-2">
        <div className="flex items-center gap-2 p-2 rounded-xl">
          <Image
            src={optimisticLikeAndCountState.isLiked ? LIKED_IMAGE : LIKE_IMAGE}
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
        {isAbleToDelete && (
          <button
            type="button"
            title="delete the reply comment"
            onClick={() => setDeleteClicked(true)}
          >
            🗑️
          </button>
        )}
      </div>

      {/* DELET MODEL */}
      {deleteClicked && (
        <CoomentReplyDeleteModel
          setDeleteClicked={setDeleteClicked}
          setOptimisticCommentsLength={setOptimisticCommentsLength}
          setOptimisticReplyCount={setOptimisticReplyCount}
          replyId={reply.id}
          setRepliesState={setRepliesState}
          setOptimisticReplyState={setOptimisticReplyState}
          setTotalCommentsLength={setTotalCommentsLength}
          setReplyCount={setReplyCount}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default SingleReply;
