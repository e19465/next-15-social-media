import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SD | Social || Sign Up",
  description: "Profile page",
};

export default function Page() {
  return (
    <div className="pt-[100px]">
      <SignUp />
    </div>
  );
}
