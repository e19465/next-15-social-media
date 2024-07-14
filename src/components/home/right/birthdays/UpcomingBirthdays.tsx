import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import Image from "next/image";

const UpcomingBirthdays = () => {
  return (
    <ProgressLink
      href="/"
      className="no-underline shadow-md border border-blue-200 w-full p-4 bg-slate-100 flex gap-4 rounded-lg"
    >
      {/* LEFT */}
      <div>
        <Image src="/gift.png" alt="gift icon" width={32} height={32} />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-start justify-start gap-1 flex-1">
        <span className="font-medium text-sm">Upcoming Birthdays</span>
        <span className="text-xs text-gray-500">
          See other 16 have upcoming birthdays
        </span>
      </div>
    </ProgressLink>
  );
};

export default UpcomingBirthdays;
