import Image from "next/image";
import { Post, User } from "@prisma/client";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import PostLikesCommentsCount from "../comment_related/PostLikesCommentsCount";
import PostDeleteButton from "./PostDeleteButton";

type SinglePostProps = Post & {
  user: User;
  likes: {
    userId: string;
  }[];
  _count: {
    comments: number;
  };
};

const SinglePost = async ({ post }: { post: SinglePostProps }) => {
  // get current user
  const { userId } = auth();
  if (!userId) return null;

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!currentUser) return null;

  // get the post owner
  const user = post?.user;

  // check for the current user is the post owner
  const isPostOwner = user.id === currentUser.id;

  // get the reply comments length
  const replyCommentsLength = await prisma.replyComment.count({
    where: {
      postId: post.id,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
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
    <div className="mb-4 bg-slate-50 shadow-blue-200 shadow-md rounded-md p-4 border-t-[2px] border-t-blue-500">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post?.user?.avatar || "/noAvatar.png"}
            alt="post owner profile photo"
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full ring-1 ring-blue-200"
          />
          <span className="font-medium text-gray-500 text-sm">
            {user?.name && user?.surname
              ? `${user.name} ${user.surname}`
              : user.username}
          </span>
        </div>
        {isPostOwner && <PostDeleteButton postId={post.id} />}
      </div>
      {/* DESCRIPTION */}
      <div className="flex flex-col">
        {/* POST IMAGE */}
        {post?.img && (
          <div className="w-full h-auto px-0 pt-4 pb-2">
            <Image
              src={post.img}
              alt="post image"
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}
        {/* POST DESCRIPTION */}
        <div className="w-full h-auto px-0 py-0">
          <span className="font-medium text-gray-500 text-sm">
            {post?.description}
          </span>
        </div>
      </div>
      <PostLikesCommentsCount
        post={post}
        replyCommentsLength={replyCommentsLength}
        currentUser={currentUser}
        comments={comments}
      />
    </div>
  );
};

export default SinglePost;
