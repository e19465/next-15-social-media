import { prisma } from "@/lib/client";
import { Follower, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import UnfollowButton from "./UnfollowButton";
import { ProgressLink } from "@/components/nprogress/NProgressHandler";

type SingleFollowingProps = {
  currentUserId: string;
  following: Follower & {
    follower: User;
  };
};

const SingleFollowing = async ({
  following,
  currentUserId,
}: SingleFollowingProps) => {
  const follower = following.follower;

  //variables
  let isFollowing = false;
  let isFollowRequestSent = false;

  //! Check if the currentuser is following the user
  const isFollowingResponse = await prisma.follower.findFirst({
    where: {
      followerId: follower.id,
      followingId: currentUserId,
    },
  });
  isFollowingResponse ? (isFollowing = true) : (isFollowing = false);

  //! Check if the currentuser has sent a follow request to the user
  const isFollowRequestSentResponse = await prisma.followRequest.findFirst({
    where: {
      senderId: currentUserId,
      recieverId: follower.id,
    },
  });
  isFollowRequestSentResponse
    ? (isFollowRequestSent = true)
    : (isFollowRequestSent = false);

  return (
    <div className="py-4 px-8 flex items-center justify-between bg-white shadow-md rounded-md">
      <div className="flex items-center gap-4">
        <ProgressLink href={`/profile/${follower.id}`}>
          <Image
            src={follower.avatar || "/noAvatar.png"}
            alt="following profile picture"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover ring ring-blue-100"
          />
        </ProgressLink>
        <p>
          {follower.name && follower.surname
            ? `${follower.name} ${follower.surname}`
            : `${follower.username}`}
        </p>
      </div>
      <UnfollowButton
        userId={follower.id}
        currentUserId={currentUserId}
        isFollowing={isFollowing}
        isFollowRequestSent={isFollowRequestSent}
      />
    </div>
  );
};

export default SingleFollowing;
