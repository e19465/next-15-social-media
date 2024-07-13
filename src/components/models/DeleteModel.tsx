import { toast } from "react-toastify";
import { deleteDoc } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";

interface BlockModelProps {
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteLoading: boolean;
  docId: number;
  category: keyof PrismaClient;
  setStateOfDocs: React.Dispatch<React.SetStateAction<any>>;
}

const DeleteModel: React.FC<BlockModelProps> = ({
  setDeleteClicked,
  setDeleteLoading,
  deleteLoading,
  docId,
  category,
  setStateOfDocs,
}) => {
  // Delete document function (action)
  const deleteDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      const res = await deleteDoc(docId, category);
      if (res === "deleted") {
        setStateOfDocs((prev: any) => {
          return prev.filter((doc: any) => doc.id !== docId);
        });
      }
      setDeleteLoading(false);
      setDeleteClicked(false);
    } catch (err) {
      toast.error("Failed to deleteDocument, try again later.");
      setDeleteLoading(false);
      setDeleteClicked(false);
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
            className={`p-2  rounded-md border border-white text-white ${
              deleteLoading && "cursor-not-allowed opacity-50"
            } hover:bg-white hover:text-black transition-colors duration-300`}
            disabled={deleteLoading}
          >
            {deleteLoading ? "deleting..." : "confirm"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default DeleteModel;
