import SingleBirthday from "./SingleBirthday";
import UpcomingBirthdays from "./UpcomingBirthdays";

const BirthDays = () => {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-start">
        <span className="font-medium text-gray-500">Birthdays</span>
      </div>

      {/* MIDDLE */}
      <div className="flex flex-col items-center gap-4">
        <SingleBirthday />
      </div>

      {/* BOTTOM */}
      <UpcomingBirthdays />
    </div>
  );
};

export default BirthDays;
