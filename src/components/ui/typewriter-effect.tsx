"use client";
import React, { useState, useEffect } from "react";

interface TypewriterProps {
  words: Array<{ text: string }>;
  className?: string;
  cursorColor?: string;
}

const TypewriterEffect: React.FC<TypewriterProps> = ({ 
  words, 
  className = "", 
  cursorColor = "border-teal-500" 
}) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const wordDelay = isDeleting ? 100 : 1500;
    
    const type = () => {
      const fullWord = words[currentWord].text;
      
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        
        if (currentText === fullWord) {
          // Word complete, set timeout before deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, wordDelay);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        
        if (currentText === "") {
          // Deletion complete, move to next word
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
          return;
        }
      }
    };
    
    const timer = setTimeout(type, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, currentWord, isDeleting, words]);

  return (
    <div className={`inline-block ${className}`}>
      <span>{currentText}</span>
      <span className={`inline-block w-[2px] h-[1em] ml-1 animate-blink ${cursorColor}`}></span>
    </div>
  );
};

export default TypewriterEffect;