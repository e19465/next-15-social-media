import React, { useState } from "react";
import { emojis } from "@/lib/emoji";

interface EmojiSelectorProps {
  onSelect: (prev: any) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ onSelect }) => {
  // Handle emoji click
  const handleEmojiClick = (emoji: string) => {
    onSelect((prev: any) => prev + emoji);
  };

  return (
    <div className="absolute bottom-[20px] left-[-200px] md:left-[-300px] w-[200px] md:w-[300px] h-[300px] z-[2000] bg-white border border-blue-500 rounded-md p-3 flex flex-wrap gap-2 scrollbar-hide overflow-auto">
      {emojis.map((emoji, index) => (
        <div key={index} onClick={(e) => handleEmojiClick(emoji)}>
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default EmojiSelector;
