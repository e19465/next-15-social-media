"use client";

const FollowBlockUserButtons = () => {
  return (
    <div className="w-full flex items-center flex-col gap-2">
      <button
        type="button"
        className="w-full p-1 flex items-center justify-center bg-blue-500 text-white border-none rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        following
      </button>
      <button
        type="button"
        className="text-xs text-red-700 self-end flex items-center justify-center bg-transparent border-none"
      >
        Block
      </button>
    </div>
  );
};

export default FollowBlockUserButtons;
