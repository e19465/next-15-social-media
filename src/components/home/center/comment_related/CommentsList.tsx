"use client";
import { Comment, Like, ReplyComment, User } from "@prisma/client";
import { useOptimistic, useState, useEffect, useRef } from "react";
import SingleComment from "./SingleComment";
import WriteComment from "./WriteComment";

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

type CommentsListProps = {
  comments: SingleCommentProps[];
  postOwnerId: string;
  postId: number;
  currentUser: User;
  setTotalCommentsLength: React.Dispatch<React.SetStateAction<number>>;
  setOptimisticCommentsLength: (value: "increment" | "decrement") => void;
};

const CommentsList = ({
  comments,
  postOwnerId,
  postId,
  currentUser,
  setTotalCommentsLength,
  setOptimisticCommentsLength,
}: CommentsListProps) => {
  // set the comments list
  const [commentsList, setCommentsList] =
    useState<SingleCommentProps[]>(comments);

  // Optimistic UI for comments
  const [optimisticCommentState, setOptimisticCommentState] = useOptimistic(
    commentsList,
    (
      prev: any,
      { method, value }: { method: string; value: SingleCommentProps }
    ) => {
      if (method === "increment") {
        return [...prev, value];
      } else if (method === "decrement") {
        return prev.filter(
          (reply: SingleCommentProps) => reply.id !== value.id
        );
      }
      return prev;
    }
  );

  // Ref for the comments container
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when a new comment is added
  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    }
  }, [optimisticCommentState]);

  return (
    <>
      <WriteComment
        setTotalCommentsLength={setTotalCommentsLength}
        setOptimisticCommentsLength={setOptimisticCommentsLength}
        user={currentUser}
        postId={postId}
        setOptimisticCommentState={setOptimisticCommentState}
        setCommentsList={setCommentsList}
      />
      <div
        ref={commentsContainerRef}
        className="w-full flex flex-col gap-4 items-center max-h-[200px] overflow-auto scrollbar-hide"
      >
        {optimisticCommentState.map((com: SingleCommentProps) => (
          <SingleComment
            key={com.id}
            postOwnerId={postOwnerId}
            postId={postId}
            comment={com}
            currentUser={currentUser}
            setCommentsList={setCommentsList}
            setTotalCommentsLength={setTotalCommentsLength}
            setOptimisticCommentsLength={setOptimisticCommentsLength}
            setOptimisticCommentState={setOptimisticCommentState}
          />
        ))}
      </div>
    </>
  );
};

export default CommentsList;
