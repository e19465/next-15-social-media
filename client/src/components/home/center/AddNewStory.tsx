const AddNewStory = () => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <span className="w-full h-full rounded-full ring-2 ring-offset-2 shadow-lg text-[30px] flex items-center justify-center bg-blue-50 text-blue-700">
          +
        </span>
      </div>
      <span className="font-medium text-xs">Add Story</span>
    </div>
  );
};

export default AddNewStory;
