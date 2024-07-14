import Image from "next/image";
import { Post, User } from "@prisma/client";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import PostLikesCommentsCount from "./PostLikesCommentsCount";

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
    <div className="">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post?.user?.avatar || "/noAvatar.png"}
            alt="post owner profile photo"
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-medium text-gray-500 text-sm">
            {user?.name && user?.surname
              ? `${user.name} ${user.surname}`
              : user.username}
          </span>
        </div>
        <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
          <Image
            src="/more.png"
            alt="post options"
            width={16}
            height={16}
            className="object-contain"
          />
        </div>
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
