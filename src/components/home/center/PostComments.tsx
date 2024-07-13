import Image from "next/image";
import SingleComment from "./SingleComment";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import CommentsList from "./CommentsList";

const PostComments = async ({
  postId,
  postOwnerId,
}: {
  postId: number;
  postOwnerId: string;
}) => {
  // get the current user ID
  const { userId } = auth();
  if (!userId) return null;

  // fetch the current user
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // if the user is not found return null
  if (!user) return null;

  // get all the comments for the post with replies and likes
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
      likes: true,
      replies: {
        include: {
          user: true,
          likes: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  if (!comments) return null;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <CommentsList
        comments={comments}
        postOwnerId={postOwnerId}
        postId={postId}
        currentUser={user}
      />
    </div>
  );
};

export default PostComments;
