"use client";
import Image from "next/image";

import LIKE_IMAGE from "../../../../public/like.png";
import LIKED_IMAGE from "../../../../public/liked.png";
import { useState } from "react";

const PostInteraction = () => {
  const [imgSrc, setImgSrc] = useState(LIKE_IMAGE);

  const handleLikes = () => {
    if (imgSrc === LIKE_IMAGE) {
      setImgSrc(LIKED_IMAGE);
    } else {
      setImgSrc(LIKE_IMAGE);
    }
  };

  return (
    <div className="w-full flex items-center justify-between text-sm">
      {/* LEFT SIDE */}
      <div className="flex gap-4">
        {/* LIKE */}
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
          <Image
            src={imgSrc}
            alt="like the post"
            title="Like the post"
            width={16}
            height={16}
            className="object-contain cursor-pointer"
            onClick={handleLikes}
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">123</span>
          <span className="text-gray-400 hidden md:inline">Likes</span>
        </div>

        {/* COMMENT */}
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
          <Image
            src="/comment.png"
            alt="comment on the post"
            title="Comment on the post"
            width={16}
            height={16}
            className="object-contain cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">123</span>
          <span className="text-gray-400 hidden md:inline">Comments</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="">
        {/* SHARE */}
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
          <Image
            src="/shareicon.png"
            alt="share the post"
            title="Share the post"
            width={20}
            height={20}
            className="object-contain cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">123</span>
          <span className="text-gray-400 hidden md:inline">Shares</span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
