import { toast } from "react-toastify";
import { deleteComment } from "@/lib/actions";
import { Comment, Like, ReplyComment, User } from "@prisma/client";

//! types
type ReplyCommentProps = ReplyComment & {
  user: User;
  likes: Like[];
};

type SingleCommentProps = Comment & {
  user: User;
  likes: Like[];
  replies: ReplyCommentProps[];
  _count: {
    likes: number;
  };
};

interface DeleteModelProps {
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: number;
  setCommentsList: React.Dispatch<React.SetStateAction<any>>;
  setTotalCommentsLength: React.Dispatch<React.SetStateAction<number>>;
  setOptimisticCommentsLength: (value: "increment" | "decrement") => void;
  setOptimisticCommentState: (action: {
    method: "increment" | "decrement";
    value: SingleCommentProps;
  }) => void;
  currentUser: User;
}

const CommentDeleteModel: React.FC<DeleteModelProps> = ({
  setDeleteClicked,
  commentId,
  setCommentsList,
  setTotalCommentsLength,
  setOptimisticCommentsLength,
  setOptimisticCommentState,
  currentUser,
}) => {
  // Delete document function (action)
  const deleteDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    const dummyComment = {
      id: commentId,
      text: "dummy",
      createdAt: new Date(),
      updatedAt: new Date(),
      postId: 1,
      userId: currentUser.id,
      user: currentUser,
      likes: [],
      replies: [],
      _count: {
        likes: 0,
      },
    };

    setOptimisticCommentsLength("decrement");
    setOptimisticCommentState({ method: "decrement", value: dummyComment });
    setDeleteClicked(false);
    try {
      const res = await deleteComment(commentId);
      if (res === "deleted") {
        setCommentsList((prev: any) => {
          return prev.filter((doc: any) => doc.id !== commentId);
        });
        setTotalCommentsLength((prev) => prev - 1);
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

export default CommentDeleteModel;
