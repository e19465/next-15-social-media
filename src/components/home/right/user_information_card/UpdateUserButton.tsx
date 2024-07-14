"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { updateUserInformation, updateUserCoverPhoto } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdateUserButton = ({ currentUser }: { currentUser: User }) => {
  // Get router from next/navigation
  const router = useRouter();
  // Define states
  const [isEditFormOpen, setIsEditFormOpen] = useState<Boolean>(false);
  const [userData, setUserData] = useState<User>({ ...currentUser });
  const [coverImageUrl, setCoverImageUrl] = useState<string>(
    userData?.cover || ""
  );
  const [userDataUpdateLoading, setUserDataUpdateLoading] = useState<
    Boolean | any
  >(false);
  const [coverPhotoLoading, setCoverPhotoLoading] = useState<Boolean | any>(
    false
  );

  // handle close form
  const handleCloseForm = () => {
    setIsEditFormOpen(false);
    router.refresh();
  };

  // Handle text input change
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setUserData({ ...userData, [fieldName]: e.target.value });
  };

  // Handle textarea change
  const onChnageTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setUserData({ ...userData, [fieldName]: e.target.value });
  };

  // set cover image url
  const handleSetCoverImageURL = (
    info: CloudinaryUploadWidgetInfo | string | undefined
  ) => {
    if (info !== undefined && typeof info !== "string") {
      setCoverImageUrl(info.secure_url);
    }
  };

  // give src for cover image div
  const getSrc = () => {
    if (coverImageUrl !== "") {
      return coverImageUrl;
    } else if (userData?.cover) {
      return userData.cover;
    } else {
      return "/noCover.png";
    }
  };

  // handle cover picture update
  const handleCoverPictureUpdate = async () => {
    if (coverImageUrl === "") {
      alert("Please upload an image first.");
      return;
    }
    setCoverPhotoLoading(true);
    try {
      const res = await updateUserCoverPhoto(currentUser.id, coverImageUrl);
      if (res == "updated") {
        setUserData({ ...userData, cover: coverImageUrl });
        setCoverImageUrl("");
        toast.success("Cover picture updated successfully");
      }
      setCoverPhotoLoading(false);
    } catch (err) {
      setCoverPhotoLoading(false);
      console.log(err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  // handle user information submission
  const handleUserInformationSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserDataUpdateLoading(true);
    try {
      const res = await updateUserInformation(currentUser.id, userData);
      if (res === "updated") {
        toast.success("User information updated successfully.");
      }
      setUserDataUpdateLoading(false);
    } catch (err) {
      console.log(err);
      setUserDataUpdateLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="">
      <span
        className="text-blue-500 text-sm cursor-pointer hover:underline"
        onClick={() => setIsEditFormOpen(true)}
      >
        Update
      </span>

      {isEditFormOpen && (
        <div
          className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-35 flex items-center justify-center z-50"
          onClick={handleCloseForm}
        >
          <div
            className="shadow-lg w-full md:w-1/2 xl:w-1/3 z-[100] h-auto max-h-[90%] overflow-auto scrollbar-hide rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full rounded-lg bg-white p-4">
              {/* CLOSE FORM BUTTON */}
              <div className="sticky bg-white z-[200] top-0 left-0 w-full h-8 flex items-center justify-end">
                <button
                  type="button"
                  title="close form"
                  className="flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-125 p-[2px] bg-blue-500 rounded-full"
                  onClick={handleCloseForm}
                >
                  <Image
                    src="/reject.png"
                    alt="close form"
                    title="close form"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {/* FORM ELEMENTS */}
              <div className="flex flex-col items-center justify-center gap-4">
                {/* HEADER TEXT */}
                <div className="w-full bg-blue-50 flex flex-col items-center justify-center gap-1 p-2 rounded-lg">
                  <h1 className="text-lg text-blue-700">Update profile</h1>
                  <p className="text-xs text-gray-500">
                    Use the navbar menu to update username or avatar
                  </p>
                </div>

                {/* COVER PICTURE UPDATE FORM */}
                <div className="w-full flex gap-2 items-center justify-start p-2">
                  <div>
                    <Image
                      src={getSrc()}
                      alt="user cover picture"
                      width={128}
                      height={64}
                      className="w-32 h-16 object-cover rounded-md border border-blue-100"
                    />
                  </div>
                  <CldUploadWidget
                    uploadPreset="sdsocial"
                    onSuccess={(result) => handleSetCoverImageURL(result?.info)}
                  >
                    {({ open }) => {
                      return (
                        <button
                          onClick={() => open()}
                          className="flex items-center justify-center px-4 py-2 bg-white transition-colors duration-300 hover:bg-blue-50 rounded-lg cursor-pointer shadow-md border border-blue-100"
                        >
                          Choose an Image
                        </button>
                      );
                    }}
                  </CldUploadWidget>

                  <button
                    type="button"
                    onClick={handleCoverPictureUpdate}
                    disabled={coverPhotoLoading}
                    title="update cover picture"
                    className={`flex items-center justify-center px-4 py-2 bg-white transition-colors duration-300 hover:bg-blue-50 rounded-lg cursor-pointer shadow-md border border-blue-100${
                      coverPhotoLoading && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {coverPhotoLoading ? "Updating..." : "Update"}
                  </button>
                </div>

                {/* TEXT INPUTS UPDATE FORM */}
                <form
                  className="w-full flex flex-col items-center justify-start gap-4 p-2"
                  onSubmit={handleUserInformationSubmission}
                >
                  {/* INPUT NAME */}
                  <div className="w-full gap-[2px] flex flex-col items-start">
                    <label
                      htmlFor="edit-user-form-name"
                      className="text-gray-500"
                    >
                      Name:
                    </label>
                    <input
                      autoFocus
                      type="text"
                      name="edit-user-form-name"
                      id="edit-user-form-name"
                      placeholder="John"
                      className="w-full rounded-lg p-2 border border-blue-200 outline-blue-500"
                      value={userData?.name || ""}
                      onChange={(e) => onChange(e, "name")}
                    />
                  </div>

                  {/* INPUT SURNAME */}
                  <div className="w-full gap-[2px] flex flex-col items-start">
                    <label
                      htmlFor="edit-user-form-surname"
                      className="text-gray-500"
                    >
                      Surname:
                    </label>
                    <input
                      type="text"
                      name="edit-user-form-surname"
                      id="edit-user-form-surname"
                      placeholder="Doe"
                      className="w-full rounded-lg p-2 border border-blue-200 outline-blue-500"
                      value={userData?.surname || ""}
                      onChange={(e) => onChange(e, "surname")}
                    />
                  </div>

                  {/* INPUT DESCRIPTION */}
                  <div className="w-full gap-[2px] flex flex-col items-start">
                    <label
                      htmlFor="edit-user-form-description"
                      className="text-gray-500"
                    >
                      Description:
                    </label>
                    <textarea
                      name="edit-user-form-description"
                      id="edit-user-form-description"
                      placeholder="Add a description about yourself"
                      className="w-full rounded-lg p-2 border border-blue-200 outline-blue-500 resize-none h-32"
                      value={userData?.description || ""}
                      onChange={(e) => onChnageTextArea(e, "description")}
                    />
                  </div>

                  {/* INPUT CITY */}
                  <div className="w-full gap-[2px] flex flex-col items-start">
                    <label
                      htmlFor="edit-user-form-city"
                      className="text-gray-500"
                    >
                      City:
                    </label>
                    <input
                      type="text"
                      name="edit-user-form-city"
                      id="edit-user-form-city"
                      placeholder="New York, USA"
                      className="w-full rounded-lg p-2 border border-blue-200 outline-blue-500"
                      value={userData?.city || ""}
                      onChange={(e) => onChange(e, "city")}
                    />
                  </div>

                  {/* INPUT SCHOOL */}
                  <div className="w-full gap-[2px] flex flex-col items-start">
                    <label
                      htmlFor="edit-user-form-school"
                      className="text-gray-500"
                    >
                      School:
                    </label>
                    <input
                      type="text"
                      name="edit-user-form-school"
                      id="edit-user-form-school"
                      placeholder="Oxford University"
                      className="w-full rounded-lg p-2 border border-blue-200 outline-blue-500"
                      value={userData?.school || ""}
                      onChange={(e) => onChange(e, "school")}
                    />
                  </div>

                  {/* INPUT WORK */}
                  <div className="w-full gap-[2px] flex flex-col items-start">
                    <label
                      htmlFor="edit-user-form-work"
                      className="text-gray-500"
                    >
                      Work:
                    </label>
                    <input
                      type="text"
                      name="edit-user-form-work"
                      id="edit-user-form-work"
                      placeholder="Apple Inc."
                      className="w-full rounded-lg p-2 border border-blue-200 outline-blue-500"
                      value={userData?.work || ""}
                      onChange={(e) => onChange(e, "work")}
                    />
                  </div>

                  {/* INPUT WEBSITE */}
                  <div className="w-full gap-[2px] flex flex-col items-start">
                    <label
                      htmlFor="edit-user-form-website"
                      className="text-gray-500"
                    >
                      Website:
                    </label>
                    <input
                      type="text"
                      name="edit-user-form-website"
                      id="edit-user-form-website"
                      placeholder="https://www.example.com"
                      className="w-full rounded-lg p-2 border border-blue-200 outline-blue-500"
                      value={userData?.website || ""}
                      onChange={(e) => onChange(e, "website")}
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="w-full flex items-center justify-end">
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg bg-blue-500 text-white shadow-md transition-colors duration-300 hover:bg-blue-600 cursor-pointer ${
                        userDataUpdateLoading && "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={userDataUpdateLoading}
                    >
                      {userDataUpdateLoading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUserButton;
