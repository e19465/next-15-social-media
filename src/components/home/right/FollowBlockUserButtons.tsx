"use client";

import { switchFollow, switchBlock } from "@/lib/actions";
import { useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";
import BlockModel from "@/components/models/BlockModel";

const FollowBlockUserButtons = ({
  userId,
  currentUserId,
  isBlocked,
  isFollowing,
  isFollowRequestSent,
}: {
  userId: string;
  currentUserId: string;
  isBlocked: boolean;
  isFollowing: boolean;
  isFollowRequestSent: boolean;
}) => {
  const router = useRouter();
  const [blockClicked, setBlockClicked] = useState(false);
  const [blockedLoading, setBlockedLoading] = useState(false);

  const [userState, setUserState] = useState({
    isBlocked: isBlocked,
    isFollowing: isFollowing,
    isFollowRequestSent: isFollowRequestSent,
  });

  const follow = async () => {
    switchOptimisticFollow("");
    try {
      await switchFollow(userId, currentUserId);
      setUserState((prev) => ({
        ...prev,
        isFollowing: prev.isFollowing && false,
        isFollowRequestSent:
          !prev.isFollowing && !prev.isFollowRequestSent ? true : false,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    userState,
    (prev) => ({
      ...prev,
      isFollowing: prev.isFollowing && false,
      isFollowRequestSent:
        !prev.isFollowing && !prev.isFollowRequestSent ? true : false,
    })
  );

  const block = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlockedLoading(true);
    try {
      const res = await switchBlock(userId, currentUserId);
      setUserState((prev) => ({
        ...prev,
        isBlocked: !prev.isBlocked,
      }));
      setBlockedLoading(false);
      setBlockClicked(false);
      if (res == "blocked") {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center flex-col gap-2">
      <form action={follow} className="w-full">
        <button
          type="submit"
          className="w-full p-1 flex items-center justify-center bg-blue-500 text-white border-none rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {optimisticFollow.isFollowing
            ? "Following"
            : optimisticFollow.isFollowRequestSent
            ? "Requested"
            : "Follow"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setBlockClicked(true)}
        className="text-xs text-red-700 self-end flex items-center justify-center bg-transparent border-none"
      >
        {userState.isBlocked ? "Unblock" : "Block"}
      </button>
      {blockClicked && (
        <BlockModel
          setBlockClicked={setBlockClicked}
          setBlockedLoading={setBlockedLoading}
          setUserState={setUserState}
          blockedLoading={blockedLoading}
          userId={userId}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default FollowBlockUserButtons;
