import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import SingleFollower from "./SingleFollower";

const FollowersList = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const followers = await prisma.follower.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: true,
    },
  });

  if (!followers) return null;

  return (
    <div className="w-full h-calc-100vh-minus-80 p-2 bg-slate-100 shadow-md overflow-auto flex flex-col scrollbar-hide">
      {followers.map((follower) => (
        <SingleFollower
          key={follower.id}
          follower={follower}
          currentUserId={userId}
        />
      ))}
    </div>
  );
};

export default FollowersList;
