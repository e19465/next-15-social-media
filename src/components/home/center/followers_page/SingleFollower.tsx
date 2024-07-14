import { prisma } from "@/lib/client";
import { Follower, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import FollowRequestButton from "./FollowRequestButton";
import { ProgressLink } from "@/components/nprogress/NProgressHandler";

type FollowerProps = Follower & {
  following: User;
};

const SingleFollower = async ({
  follower,
  currentUserId,
}: {
  follower: FollowerProps;
  currentUserId: string;
}) => {
  //variables
  let isFollowing = false;
  let isFollowRequestSent = false;

  //! Check if the currentuser is following the user
  const isFollowingResponse = await prisma.follower.findFirst({
    where: {
      followerId: follower.followingId,
      followingId: currentUserId,
    },
  });
  isFollowingResponse ? (isFollowing = true) : (isFollowing = false);

  //! Check if the currentuser has sent a follow request to the user
  const isFollowRequestSentResponse = await prisma.followRequest.findFirst({
    where: {
      senderId: currentUserId,
      recieverId: follower.followingId,
    },
  });
  isFollowRequestSentResponse
    ? (isFollowRequestSent = true)
    : (isFollowRequestSent = false);

  const following = follower.following;

  return (
    <div className="py-4 px-8 flex items-center justify-between bg-white shadow-md rounded-md">
      <div className="flex items-center gap-4">
        <ProgressLink href={`/profile/${following.id}`}>
          <Image
            src={following.avatar || "/noAvatar.png"}
            alt="follower profile picture"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover ring ring-blue-100"
          />
        </ProgressLink>
        <p>
          {following.name && following.surname
            ? `${following.name} ${following.surname}`
            : `${following.username}`}
        </p>
      </div>
      <FollowRequestButton
        userId={follower.followingId}
        currentUserId={currentUserId}
        isFollowing={isFollowing}
        isFollowRequestSent={isFollowRequestSent}
      />
    </div>
  );
};

export default SingleFollower;
