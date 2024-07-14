import { toast } from "react-toastify";
import { Like, PrismaClient, ReplyComment, User } from "@prisma/client";
import { deleteReply } from "@/lib/actions";

type ReplyCommentProps = ReplyComment & {
  user: User;
  likes: Like[];
};

interface DeleteModelProps {
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setOptimisticCommentsLength: (value: "increment" | "decrement") => void;
  setOptimisticReplyCount: (value: "increment" | "decrement") => void;
  replyId: number;
  setRepliesState: React.Dispatch<React.SetStateAction<any>>;
  setOptimisticReplyState: (action: {
    method: "increment" | "decrement";
    value: ReplyCommentProps;
  }) => void;
  setTotalCommentsLength: React.Dispatch<React.SetStateAction<number>>;
  setReplyCount: React.Dispatch<React.SetStateAction<number>>;
  currentUser: User;
}

const CoomentReplyDeleteModel: React.FC<DeleteModelProps> = ({
  setDeleteClicked,
  setOptimisticCommentsLength,
  setOptimisticReplyCount,
  replyId,
  setRepliesState,
  setOptimisticReplyState,
  setTotalCommentsLength,
  setReplyCount,
  currentUser,
}) => {
  // Delete document function (action)
  const deleteDocument = async (e: React.FormEvent) => {
    e.preventDefault();

    const dummyReply = {
      id: replyId,
      userId: currentUser.id,
      postId: 0,
      commentId: 0,
      text: "dummy",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: currentUser,
      likes: [],
    };
    setOptimisticCommentsLength("decrement");
    setOptimisticReplyCount("decrement");
    setOptimisticReplyState({ method: "decrement", value: dummyReply });
    setDeleteClicked(false);
    try {
      const res = await deleteReply(replyId);
      if (res === "deleted") {
        setRepliesState((prev: any) => {
          return prev.filter((doc: any) => doc.id !== replyId);
        });
        setTotalCommentsLength((prev) => prev - 1);
        setReplyCount((prev) => prev - 1);
      }
    } catch (err) {
      toast.error("Failed to deleteDocument, try again later.");
      console.log(err);
    }
  };

  return (
    <section
      className="w-full h-screen z-[999] fixed top-0 left-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-center"
      onClick={() => setDeleteClicked(false)}
    >
      <form
        onSubmit={deleteDocument}
        className="w-[250px] sm:w-[400px] h-[180px]  rounded-md flex items-center justify-center flex-col bg-[#1a1a2e] p-2 shadow-md shadow-blue-900"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="pl-4 w-full text-red-500 text-left text-lg">
          Are you sure?
        </p>
        <p className="pl-4 w-full text-gray-200 text-left text-sm my-2">
          After you deleted this, you can't recover it. If you are sure, click
          on confirm.
        </p>
        <div className="mt-[10px] w-full h-auto flex items-center justify-end gap-2 pr-4">
          <button
            type="button"
            className="
            p-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
            onClick={() => setDeleteClicked(false)}
          >
            cancel
          </button>
          <button
            type="submit"
            className={`p-2  rounded-md border border-white text-white  hover:bg-white hover:text-black transition-colors duration-300`}
          >
            confirm
          </button>
        </div>
      </form>
    </section>
  );
};

export default CoomentReplyDeleteModel;
