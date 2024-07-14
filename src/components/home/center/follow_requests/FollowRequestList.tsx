import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import FollowRequests from "./FollowRequests";

const FollowRequestList = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const followRequests = await prisma.followRequest.findMany({
    where: {
      recieverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (!followRequests) return null;

  return (
    <div className="w-full h-calc-100vh-minus-80 p-2 bg-slate-100 shadow-md overflow-auto flex flex-col scrollbar-hide">
      {followRequests.length === 0 ? (
        <p className="flex items-center justify-center w-full h-full text-gray-500 text-xl">
          No follow requests
        </p>
      ) : (
        <FollowRequests requests={followRequests} />
      )}
    </div>
  );
};

export default FollowRequestList;
