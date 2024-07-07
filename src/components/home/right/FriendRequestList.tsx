"use client";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { acceptFollowRequest, rejectFollowRequest } from "@/lib/actions";
import { useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestsState, setRequestsState] =
    useState<RequestWithUser[]>(requests);

  const [optimisticRequests, setOptimisticRequests] = useOptimistic(
    requestsState,
    (state, value: number) => state.filter((request) => request.id !== value)
  );

  const handleFollowRequestAccept = async (request: RequestWithUser) => {
    setOptimisticRequests(request.id);
    try {
      await acceptFollowRequest(request.senderId, request.recieverId);
      setRequestsState((prev) => prev.filter((req) => req.id !== request.id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollowRequestReject = async (request: RequestWithUser) => {
    setOptimisticRequests(request.id);
    try {
      await rejectFollowRequest(request.senderId, request.recieverId);
      setRequestsState((prev) => prev.filter((req) => req.id !== request.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {optimisticRequests?.map((request) => (
        <div
          className="w-full p-2 gap-2 flex items-center justify-center"
          key={request.id}
        >
          {/* SENDER IMAGE */}
          <div className="flex items-center justify-center">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt="friend request sender image"
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>

          {/* SENDER NAME */}
          <div className="flex items-center justify-start flex-1 overflow-hidden">
            <span className="font-medium text-sm">
              {request.sender.username}
            </span>
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              title="accept friend request"
              className="flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-125"
              onClick={() => handleFollowRequestAccept(request)}
            >
              <Image
                src="/accept.png"
                alt="accept friend request"
                title="accept friend request"
                width={20}
                height={20}
              />
            </button>
            <button
              type="button"
              title="reject friend request"
              className="flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-125"
              onClick={() => handleFollowRequestReject(request)}
            >
              <Image
                src="/reject.png"
                alt="reject friend request"
                title="reject friend request"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;
