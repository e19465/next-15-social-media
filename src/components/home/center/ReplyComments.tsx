"use client";
import { Like, ReplyComment, User } from "@prisma/client";
import Image from "next/image";
import SingleReply from "./SingleReply";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { replyToComment } from "@/lib/actions";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

type ReplyCommentsProps = ReplyComment & {
  user: User;
  likes: Like[];
};

const ReplyComments = ({
  postId,
  currentUser,
  commentId,
  replies,
  isReplyComponentOpen,
  postOwnerId,
  setIsReplyComponentOpen,
}: {
  postOwnerId: string;
  postId: number;
  currentUser: User;
  commentId: number;
  replies: ReplyCommentsProps[];
  isReplyComponentOpen: boolean;
  setIsReplyComponentOpen: (value: boolean) => void;
}) => {
  // get the current user from clerk
  const clerkUser = useUser();
  if (!clerkUser) return null;

  // get the current user ID
  const { userId: currentUserId } = useAuth();
  if (!currentUserId) return null;

  // define the user avatar url
  const userAvatarURL = clerkUser.user?.imageUrl || "/noAvatar.png";

  // define states
  const [replyComment, setReplyComment] = useState<string>("");
  const [repliesState, setRepliesState] =
    useState<ReplyCommentsProps[]>(replies);
  const [isReplyLoading, setIsReplyLoading] = useState<boolean>(false);

  // handle the close of the model
  const handleClose = () => {
    setIsReplyComponentOpen(false);
  };

  // form action to handle reply
  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReplyLoading(true);
    try {
      const res = await replyToComment(
        postId,
        commentId,
        currentUserId,
        replyComment
      );
      if (res) {
        setRepliesState((prev) => [...prev, res]);
      }
      setReplyComment("");
      setIsReplyLoading(false);
    } catch (err) {
      setIsReplyLoading(false);
      toast.error("Failed to add reply comment");
      console.error(err);
    }
  };

  return (
    <>
      {isReplyComponentOpen && (
        <div
          className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-35 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="shadow-lg w-full md:w-1/2 xl:w-1/3 z-[100] h-auto max-h-[90%] overflow-auto scrollbar-hide rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full rounded-lg bg-white p-4">
              {/* CLOSE FORM BUTTON */}
              <div className="sticky bg-white z-[200] top-0 left-0 w-full h-8 flex items-center justify-end">
                <button
                  type="button"
                  title="close form"
                  className="flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-125 p-[2px] bg-blue-500 rounded-full"
                  onClick={handleClose}
                >
                  <Image
                    src="/reject.png"
                    alt="close form"
                    title="close form"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {/* Reply Comments Section */}
              <div className="w-full flex flex-col gap-4">
                {repliesState.length !== 0 &&
                  repliesState.map((singleReply) => (
                    <SingleReply
                      setStateOfDocs={setRepliesState}
                      reply={singleReply}
                      key={singleReply.id}
                      postOwnerId={postOwnerId}
                    />
                  ))}
              </div>

              {/* ADD REPLY COMPONENT */}
              <div className="w-full p-2 sticky bottom-0 left-0 z-[1000]">
                <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm shadow-md mt-4">
                  {/* AVATAR */}
                  <Image
                    src={userAvatarURL}
                    alt="add post image"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded-full hidden sm:block"
                  />
                  {/* POST */}
                  <div className="flex-1">
                    {/* TEXT INPUT */}
                    <form onSubmit={handleReply} className="flex gap-4">
                      <textarea
                        name="add-post-text-area"
                        id="add-post-text-area"
                        title="add-post-text-area"
                        placeholder="What's on your mind?"
                        className="w-full h-20 p-2 bg-slate-100 rounded-lg resize-none flex-1 outline-blue-500"
                        value={replyComment}
                        onChange={(e) => setReplyComment(e.target.value)}
                      />
                      <div className="flex items-center gap-2 self-end">
                        <button
                          type="submit"
                          title="add post submit button"
                          disabled={isReplyLoading}
                          className={`${
                            isReplyLoading && "cursor-not-allowed"
                          }`}
                        >
                          {isReplyLoading ? (
                            <p>...</p>
                          ) : (
                            <Image
                              src="/share.png"
                              alt="add new reply comment button"
                              title="Add new reply comment button"
                              width={24}
                              height={24}
                              className="w-5 h-5 object-cover cursor-pointer"
                            />
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyComments;
