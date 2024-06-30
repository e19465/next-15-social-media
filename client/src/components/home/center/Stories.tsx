import Image from "next/image";
import AddNewStory from "./AddNewStory";
import SingleStory from "./SingleStory";

const Stories = () => {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md text-xs">
      <div className="flex gap-6 custom-small-horizontal-scrollbar p-2">
        <AddNewStory />
        <SingleStory />
        <SingleStory />
        <SingleStory />
        <SingleStory />
        <SingleStory />
        <SingleStory />
        <SingleStory />
      </div>
    </div>
  );
};

export default Stories;
