import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import { prisma } from "@/lib/client";
import Image from "next/image";

const UserMedia = async ({ userId }: { userId: string }) => {
  const userPostsWithMedia = await prisma.post.findMany({
    where: {
      userId,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">Media</span>
        <ProgressLink className="text-blue-500 hover:underline" href="#">
          See All
        </ProgressLink>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-wrap gap-4 justify-start">
        {userPostsWithMedia.length ? (
          userPostsWithMedia?.map((post) => (
            <div className="relative w-1/5 h-24" key={post.id}>
              <Image
                src={post.img!}
                alt="post"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ))
        ) : (
          <p className="w-full text-center text-sm p-2">No Media found</p>
        )}
      </div>
    </div>
  );
};

export default UserMedia;
