import Image from "next/image";

interface SingleCommentProps {
  comment: {
    id: number;
    user: {
      name: string;
      image: string;
    };
    comment: string;
  };
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment }) => {
  return (
    <div className="w-full flex items-start gap-4">
      {/* COMMENT OWNER IMAGE */}
      <Image
        src={comment.user.image}
        alt={`${comment.user.name}'s profile photo`}
        width={32}
        height={32}
        className="w-8 h-8 object-cover rounded-full"
      />

      {/*  COMMENT DETAILS SETION */}
      <div className="flex flex-col flex-1">
        <span className="font-medium text-sm text-gray-500">
          {comment.user.name}
        </span>
        <p className="text-xs text-gray-700">{comment.comment}</p>

        {/* COMMENT LIKE AND REPLY */}
        <div className="flex items-center gap-4 text-xs mt-2">
          <div className="flex items-center gap-2 p-2 rounded-xl">
            <Image
              src="/like.png"
              alt="like the comment"
              title="Like the comment"
              width={16}
              height={16}
              className="object-contain cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">123</span>
            <span className="text-gray-400 hidden md:inline">Likes</span>
          </div>
          <button
            type="button"
            title="Reply to this comment"
            className="text-xs text-gray-500 cursor-pointer bg-transparent outline-none border-none"
          >
            Reply
          </button>
        </div>
      </div>

      {/* MORE OPTIONS EMOJI */}
      <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
        <Image
          src="/more.png"
          alt="comment options"
          title="Comment options"
          width={16}
          height={16}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default SingleComment;
