"use client";
import PostInteraction from "../post_related/PostInteraction";
import PostComments from "./PostComments";
import { Comment, Like, Post, ReplyComment, User } from "@prisma/client";
import { useOptimistic, useState } from "react";

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

type SinglePostProps = Post & {
  user: User;
  likes: {
    userId: string;
  }[];
  _count: {
    comments: number;
  };
};

type PostLikesCommentsCountProps = {
  post: SinglePostProps;
  replyCommentsLength: number;
  currentUser: User;
  comments: SingleCommentProps[];
};

const PostLikesCommentsCount = ({
  post,
  replyCommentsLength,
  currentUser,
  comments,
}: PostLikesCommentsCountProps) => {
  // variables
  const postCommentsLength = post._count.comments;

  // states
  const [totalCommentsLength, setTotalCommentsLength] = useState<number>(
    postCommentsLength + replyCommentsLength
  );

  // optimistic UI state
  const [optimisticCommentsLength, setOptimisticCommentsLength] = useOptimistic(
    totalCommentsLength,
    (prev: number, value: "increment" | "decrement") => {
      if (value === "increment") {
        return prev + 1;
      } else if (value === "decrement") {
        return prev - 1;
      }
      return prev; // Add this line to ensure a number is always returned
    }
  );

  return (
    <>
      {/* INTERACTION */}
      <div className="w-full h-auto mt-4">
        <PostInteraction
          post={post}
          optimisticCommentsLength={optimisticCommentsLength}
        />
      </div>

      {/* COMMENTS */}
      <div className="w-full h-auto mt-4">
        <PostComments
          comments={comments}
          currentUser={currentUser}
          postId={post.id}
          postOwnerId={post.userId}
          setTotalCommentsLength={setTotalCommentsLength}
          setOptimisticCommentsLength={setOptimisticCommentsLength}
        />
      </div>
    </>
  );
};

export default PostLikesCommentsCount;
