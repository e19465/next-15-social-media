import { Comment, Like, ReplyComment, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
import { addComment } from "@/lib/actions";
import { toast } from "react-toastify";

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

type WriteCommentProps = {
  user: User;
  postId: number;
  setCommentsList: React.Dispatch<React.SetStateAction<SingleCommentProps[]>>;
  setOptimisticCommentState: (action: {
    method: "increment" | "decrement";
    value: SingleCommentProps;
  }) => void;
  setTotalCommentsLength: React.Dispatch<React.SetStateAction<number>>;
  setOptimisticCommentsLength: (value: "increment" | "decrement") => void;
};

const WriteComment = ({
  user,
  postId,
  setCommentsList,
  setOptimisticCommentState,
  setTotalCommentsLength,
  setOptimisticCommentsLength,
}: WriteCommentProps) => {
  // comment text area value
  const [comment, setComment] = useState<string>("");

  // handle the comment submission
  const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;

    // declare the comment data
    const commentData: SingleCommentProps = {
      id: Math.random(),
      text: comment,
      postId: postId,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      user: user,
      likes: [],
      replies: [],
      _count: {
        likes: 0,
      },
    };

    // add the optimistic comment to the comments list and optimistically update the UI
    const commentValue = comment;
    setOptimisticCommentState({ method: "increment", value: commentData });
    setOptimisticCommentsLength("increment");
    setComment("");

    try {
      const addedCommentResponse = await addComment(postId, user.id, comment);
      if (!addedCommentResponse) {
        toast.error("Failed to post the comment");
        return;
      }
      setCommentsList((prev) => [...prev, addedCommentResponse]);
      setTotalCommentsLength((prev) => prev + 1);
    } catch (err) {
      setComment(commentValue);
      toast.error("Failed to post the comment");
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center gap-4">
      <Image
        src={user.avatar || "/noAvatar.png"}
        alt="post owner profile photo"
        width={40}
        height={40}
        className="w-10 h-10 object-cover rounded-full"
      />
      {/* TEXT AREA AND BUTTONS */}
      <form className="flex gap-2 flex-1" onSubmit={handleSendComment}>
        <textarea
          placeholder="Write a comment..."
          className="w-full p-2 bg-slate-100 rounded-xl flex-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 scrollbar-hide text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex gap-2 self-end p-2">
          <button type="button" title="select an emoji">
            <Image
              src="/emoji.png"
              alt="select an emoji"
              title="Select an emoji"
              width={24}
              height={24}
              className="w-5 h-5 object-cover cursor-pointer"
            />
          </button>
          <button type="submit" title="send the comment">
            <Image
              src="/share.png"
              alt="post the comment"
              title="Post the comment"
              width={24}
              height={24}
              className="w-5 h-5 object-cover cursor-pointer"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteComment;
