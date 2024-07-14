import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import FriendRequestsList from "./FriendRequestList";

const FriendRequests = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const friendRequests = await prisma.followRequest.findMany({
    where: {
      recieverId: userId,
    },
    include: {
      sender: true,
    },
    take: 3,
  });

  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">Follow Requests</span>
        <ProgressLink
          className="text-blue-500 hover:underline"
          href="/follow_requests"
        >
          See All
        </ProgressLink>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-4">
        {friendRequests.length === 0 ? (
          <span className="text-gray-500">No friend requests</span>
        ) : (
          <FriendRequestsList requests={friendRequests} />
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
