import NotFound from "@/app/not-found";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const formatNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  }
  return num.toString();
};

const CenterProfileCard = async ({ userId }: { userId?: string }) => {
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return <NotFound />;

  let isBlocked;
  const { userId: currentUserId } = auth();
  if (currentUserId && currentUserId !== userId) {
    const res = await prisma.blockRequest.findFirst({
      where: {
        blockedId: userId,
        blockerId: currentUserId,
      },
    });
    if (res) {
      isBlocked = true;
    } else {
      isBlocked = false;
    }
  } else {
    isBlocked = false;
  }

  if (isBlocked) return <NotFound />;

  return (
    <div className="w-full p-4 bg-white rounded-lg flex flex-col gap-6 justify-between shadow-md">
      {/* IMAGE CONTAINER */}
      <div className="h-60 relative">
        <Image
          src={user.cover || "/noCover.png"}
          alt="profile cover image"
          fill
          className="rounded-lg object-cover z-1"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt="profile cover image"
          height={112}
          width={112}
          className="w-28 h-28 object-cover absolute top-full left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white z-10"
        />
      </div>

      {/* USER DETAILS */}
      <div className="pt-10 flex flex-col items-center gap-6 capitalize">
        <span className="text-gray-700 text-xl font-bold">
          {user.name && user.surname
            ? `${user.name} ${user.surname}`
            : user.username}
        </span>

        {/* OTHER DETAILS followers, following, posts */}
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-700 text-base font-bold">
              {formatNumber(user._count.posts)}
            </span>
            <span className="text-blue-500 text-sm">posts</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-700 text-base font-bold">
              {formatNumber(user._count.followers)}
            </span>
            <span className="text-blue-500 text-sm">followers</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-700 text-base font-bold">
              {formatNumber(user._count.followings)}
            </span>
            <span className="text-blue-500 text-sm">following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterProfileCard;
