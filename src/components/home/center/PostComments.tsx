import Image from "next/image";
import SingleComment from "./SingleComment";
import { Post, User } from "@prisma/client";
import { prisma } from "@/lib/client";

const PostComments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  if (!comments) return null;

  console.log(comments);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* WRITE A COMMENT */}
      <div className="w-full flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="post owner profile photo"
          width={40}
          height={40}
          className="w-10 h-10 object-cover rounded-full"
        />
        {/* TEXT AREA AND BUTTONS */}
        <div className="flex gap-2 flex-1">
          <textarea
            placeholder="Write a comment..."
            className="w-full p-2 bg-slate-100 rounded-xl flex-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 scrollbar-hide text-sm"
          />
          <div className="flex gap-2 self-end p-2">
            <Image
              src="/emoji.png"
              alt="select an emoji"
              title="Select an emoji"
              width={24}
              height={24}
              className="w-5 h-5 object-cover cursor-pointer"
            />
            <Image
              src="/share.png"
              alt="post the comment"
              title="Post the comment"
              width={24}
              height={24}
              className="w-5 h-5 object-cover cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* AVAILABLE COMMENTS */}
      <div className="w-full flex flex-col gap-4 items-center">
        {comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostComments;
