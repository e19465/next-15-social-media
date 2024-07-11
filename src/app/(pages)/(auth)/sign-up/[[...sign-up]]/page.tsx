import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SDSOCIAL | Sign Up",
  description: "Sign up to SDSOCIAL with Clerk.",
};

export default function Page() {
  return (
    <div className="pt-[100px]">
      <SignUp />
    </div>
  );
}
