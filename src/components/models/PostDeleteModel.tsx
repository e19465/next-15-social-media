import React from "react";
import { toast } from "react-toastify";
import { ownerDeletePost } from "@/lib/actions";

interface DeleteModelProps {
  postId: number;
  isPostDeleteLoading: boolean;
  setPostDeleteModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPostDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  router: any;
}

const PostDeleteModel: React.FC<DeleteModelProps> = ({
  isPostDeleteLoading,
  setIsPostDeleteLoading,
  setPostDeleteModelOpen,
  postId,
  router,
}) => {
  const deletePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPostDeleteLoading(true);

    try {
      const res = await ownerDeletePost(postId);
      if (res) {
        toast.success("Post deleted successfully");
        router.refresh();
      }
      setIsPostDeleteLoading(false);
      setPostDeleteModelOpen(false);
    } catch (err) {
      setIsPostDeleteLoading(false);
      setPostDeleteModelOpen(false);
      toast.error("Failed to delete the post");
      console.error(err);
    }
  };

  return (
    <section
      className="w-full h-screen z-[999] fixed top-0 left-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-center"
      onClick={() => setPostDeleteModelOpen(false)}
    >
      <form
        onSubmit={deletePost}
        className="w-[250px] sm:w-[400px] h-[180px]  rounded-md flex items-center justify-center flex-col bg-[#1a1a2e] p-2 shadow-md shadow-blue-900"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="pl-4 w-full text-red-500 text-left text-lg">
          Are you sure?
        </p>
        <p className="pl-4 w-full text-gray-200 text-left text-sm my-2">
          After you deleted this post, you can't recover it. If you are sure,
          click on confirm.
        </p>
        <div className="mt-[10px] w-full h-auto flex items-center justify-end gap-2 pr-4">
          <button
            type="button"
            className="
            p-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
            onClick={() => setPostDeleteModelOpen(false)}
          >
            cancel
          </button>
          <button
            type="submit"
            className={`p-2  rounded-md border border-white text-white  hover:bg-white hover:text-black transition-colors duration-300 ${
              isPostDeleteLoading && "cursor-not-allowed"
            }`}
            disabled={isPostDeleteLoading}
          >
            {isPostDeleteLoading ? "deleting..." : "confirm"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostDeleteModel;
