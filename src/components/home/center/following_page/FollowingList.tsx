import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import SingleFollowing from "./SingleFollowing";

const FollowingList = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;

  const userFollowingList = await prisma.follower.findMany({
    where: {
      followingId: currentUserId,
    },
    include: {
      follower: true,
    },
  });

  return (
    <div className="w-full h-calc-100vh-minus-80 p-2 bg-slate-100 shadow-md overflow-auto flex flex-col scrollbar-hide">
      {userFollowingList.map((following) => (
        <SingleFollowing
          key={following.id}
          following={following}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default FollowingList;
