"use client";
import { Story, User } from "@prisma/client";
import SingleStory from "./SingleStory";
import { useOptimistic, useState } from "react";
import AddNewStory from "./AddNewStory";

type StoryWithUser = Story & { user: User };

const StoryList = ({
  stories,
  currentUser,
}: {
  stories: StoryWithUser[];
  currentUser: User;
}) => {
  // define state
  const [storyList, setStoryList] = useState<StoryWithUser[]>(stories);

  // optimistic UI state
  const [optimisticStories, setOptimisticStories] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => {
      const newState = state.filter((story) => story.userId !== currentUser.id);
      return [value, ...newState];
    }
  );

  return (
    <>
      <AddNewStory
        currentUser={currentUser}
        setStoryList={setStoryList}
        setOptimisticStories={setOptimisticStories}
      />
      {optimisticStories.length > 0 &&
        optimisticStories.map((story) => (
          <SingleStory key={story.id} story={story} />
        ))}
    </>
  );
};

export default StoryList;
