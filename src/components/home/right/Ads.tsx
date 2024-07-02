import SingleAdd from "./SingleAdd";

type AdsProps = {
  size: "sm" | "md" | "lg";
};

const Ads: React.FC<AdsProps> = ({ size }) => {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-4 justify-between text-sm shadow-md">
      <SingleAdd size={size} />
    </div>
  );
};

export default Ads;
