import Image from "next/image";
import React from "react";

const SingleFriendRequest = () => {
  return (
    <div className="w-full p-2 gap-2 flex items-center justify-center">
      {/* SENDER IMAGE */}
      <div className="flex items-center justify-center">
        <Image
          src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="friend request sender image"
          width={32}
          height={32}
          className="w-8 h-8 object-cover rounded-full"
        />
      </div>

      {/* SENDER NAME */}
      <div className="flex items-center justify-start flex-1 overflow-hidden">
        <span className="font-medium text-sm">John David</span>
      </div>

      {/* OPTIONS */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-125">
          <Image
            src="/accept.png"
            alt="accept friend request"
            title="accept friend request"
            width={20}
            height={20}
          />
        </div>
        <div className="flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-125">
          <Image
            src="/reject.png"
            alt="reject friend request"
            title="reject friend request"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleFriendRequest;
