import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SDSOCIAL | Sign In",
  description: "Sign in to SDSOCIAL with Clerk.",
};

export default function Page() {
  return <SignIn />;
}
