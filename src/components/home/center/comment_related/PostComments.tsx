import CommentsList from "./CommentsList";
import React from "react";
import { Comment, Like, ReplyComment, User } from "@prisma/client";

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

const PostComments = ({
  postId,
  postOwnerId,
  setTotalCommentsLength,
  setOptimisticCommentsLength,
  currentUser,
  comments,
}: {
  postId: number;
  postOwnerId: string;
  setTotalCommentsLength: React.Dispatch<React.SetStateAction<number>>;
  setOptimisticCommentsLength: (value: "increment" | "decrement") => void;
  currentUser: User;
  comments: SingleCommentProps[];
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <CommentsList
        comments={comments}
        postOwnerId={postOwnerId}
        postId={postId}
        currentUser={currentUser}
        setTotalCommentsLength={setTotalCommentsLength}
        setOptimisticCommentsLength={setOptimisticCommentsLength}
      />
    </div>
  );
};

export default PostComments;
