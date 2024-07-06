import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import Image from "next/image";
import FollowBlockUserButtons from "./FollowBlockUserButtons";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const UserInformation = async ({ userId }: { userId?: string }) => {
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  // Format joined date
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isBlocked = false;
  let isFollowing = false;
  let isFollowRequestSent = false;

  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;
  if (currentUserId) {
    //! Check if the user is blocked
    const blockResponse = await prisma.blockRequest.findFirst({
      where: {
        blockedId: userId,
        blockerId: currentUserId,
      },
    });
    blockResponse ? (isBlocked = true) : (isBlocked = false);

    //! Check if the currentuser is following the user
    const isFollowingResponse = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    isFollowingResponse ? (isFollowing = true) : (isFollowing = false);

    //! Check if the currentuser has sent a follow request to the user
    const isFollowRequestSentResponse = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        recieverId: userId,
      },
    });
    isFollowRequestSentResponse
      ? (isFollowRequestSent = true)
      : (isFollowRequestSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">Details</span>
        <ProgressLink className="text-blue-500 hover:underline" href="#">
          See All
        </ProgressLink>
      </div>

      {/* NAME AND USERNAME */}
      <div className="flex gap-2 items-center justify-start">
        <span className="text-base font-medium text-gray-800">
          {user.name && user.surname
            ? `${user.name} ${user.surname}`
            : user.username}
        </span>
        <span className="text-sm font-medium text-gray-500">
          @{user.username}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="text-sm text-gray-600">
        <p>{user.description}</p>
      </div>

      {/* PERSONAL INFO */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-2 w-[30%]">
            <Image
              src="/map.png"
              alt="Living Location"
              width={20}
              height={20}
            />
            <span className="text-sm text-gray-400 w-[70%]">Living in</span>
          </div>
          <span className="text-sm font-bold text-gray-600">
            {user.city || "Not Available"}
          </span>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex items-center gap-2 w-[30%]">
            <Image
              src="/school.png"
              alt="Current School"
              width={20}
              height={20}
            />
            <span className="text-sm text-gray-400 w-[70%]">Went to</span>
          </div>
          <span className="text-sm font-bold text-gray-600">
            {user.school || "Not Available"}
          </span>
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-2 w-[30%]">
            <Image src="/work.png" alt="Working Place" width={20} height={20} />
            <span className="text-sm text-gray-400 w-[70%]">Works at</span>
          </div>
          <span className="text-sm font-bold text-gray-600">
            {user.work || "Not Available"}
          </span>
        </div>
      </div>

      {/* PROFILE LINK AND JOINED DATE */}
      <div className="flex items-center justify-between">
        {/* PROFILE LINK */}
        {user.website && (
          <div className="flex items-center gap-2">
            <Image src="/link.png" alt="Profile Link" width={20} height={20} />
            <ProgressLink className="text-blue-500 hover:underline" href="#">
              {user.website}
            </ProgressLink>
          </div>
        )}

        {/* JOINED DATE */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <Image src="/date.png" alt="Joined Date" width={20} height={20} />
            <span className="text-xs text-gray-500">Joined</span>
          </div>
          <span className="text-xs text-gray-700">{joinedDate}</span>
        </div>
      </div>

      {/* FOLLOWING BUTTON AND BLOCK BUTTON */}
      <FollowBlockUserButtons
        userId={userId}
        currentUserId={currentUserId}
        isBlocked={isBlocked}
        isFollowing={isFollowing}
        isFollowRequestSent={isFollowRequestSent}
      />
    </div>
  );
};

export default UserInformation;
