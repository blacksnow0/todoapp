"use client";
import React, { useEffect, useRef, useState } from "react";

export default function TaskDetail({ selectedTask, onUpdate, onDelete }) {
  const [title, setTitle] = useState(selectedTask?.title || "");
  const [description, setDescription] = useState(
    selectedTask?.description || ""
  );

  const debounceTimer = useRef(null);

  useEffect(() => {
    setTitle(selectedTask?.title || "");
    setDescription(selectedTask?.description || "");
  }, [selectedTask]);

  useEffect(() => {
    if (!selectedTask) return;

    const isTitleChanged = title !== selectedTask?.title;
    const isDescriptionChanged = description !== selectedTask?.description;

    if (!isTitleChanged && !isDescriptionChanged) return;

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const updateTask = async () => {
        try {
          const res = await fetch(
            `http://localhost:8001/api/tasks/${selectedTask._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, description }),
            }
          );

          const updated = await res.json();
          onUpdate(updated);
        } catch (error) {
          console.error("Failed to save task:", error);
        }
      };

      updateTask();
    }, 900);

    return () => clearTimeout(debounceTimer.current);
  }, [title, description, selectedTask, onUpdate]);

  return (
    <div className="w-full md:w-[60%] h-[80vh] md:h-[70vh] bg-white rounded-xl shadow-md border border-neutral-200 p-4 md:p-6">
      <div className="flex justify-between items-start mb-4 gap-2">
        <input
          className="text-2xl md:text-3xl font-bold text-neutral-800 bg-transparent outline-none w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titles..."
        />
        {selectedTask && (
          <button
            className="mt-1 md:mt-2 cursor-pointer shrink-0"
            onClick={() => {
              onDelete(selectedTask._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 40 40"
            >
              <path
                fill="#8b75a1"
                d="M24.279,3l0.667,2h-9.892l0.667-2H24.279 M24.279,2h-8.558c-0.43,0-0.813,0.275-0.949,0.684L14,5v1 h12V5l-0.772-2.316C25.092,2.275,24.71,2,24.279,2L24.279,2z"
              />
              <path
                fill="#dcd5f2"
                d="M8,37.5c-0.827,0-1.5-0.673-1.5-1.5V8.5h27V36c0,0.827-0.673,1.5-1.5,1.5H8z"
              />
              <path
                fill="#8b75a1"
                d="M33,9v27c0,0.551-0.449,1-1,1H8c-0.551,0-1-0.449-1-1V9H33 M34,8H6v28c0,1.105,0.895,2,2,2h24 c1.105,0,2-0.895,2-2V8L34,8z"
              />
              <path
                fill="#dcd5f2"
                d="M4.5,8.5V7c0-0.827,0.673-1.5,1.5-1.5h28c0.827,0,1.5,0.673,1.5,1.5v1.5H4.5z"
              />
              <path
                fill="#8b75a1"
                d="M34 6c.551 0 1 .449 1 1v1H5V7c0-.551.449-1 1-1H34M34 5H6C4.895 5 4 5.895 4 7v2h32V7C36 5.895 35.105 5 34 5L34 5zM24 11H25V35H24zM15 11H16V35H15zM10 11H11V35H10zM29 11H30V35H29z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-b pb-2 mb-4 text-neutral-600 text-sm">
        <button className="hover:text-black font-bold">B</button>
        <button className="hover:text-black italic">I</button>
        <button className="hover:text-black underline">U</button>
        <div className="hidden sm:flex items-center gap-2">
          <span className="border-l h-4" />
          <button className="hover:text-black">☰</button>
          <button className="hover:text-black">≡</button>
          <button className="hover:text-black">•</button>
          <span className="border-l h-4" />
          <button className="hover:text-black">⎋</button>
          <button className="hover:text-black">𝕋</button>
        </div>
      </div>

      <textarea
        className="text-neutral-700 text-base md:text-lg leading-relaxed w-full h-60 md:h-80 resize-none bg-transparent outline-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="To stay representative of framework & new example apps."
      />

      {selectedTask && (
        <p className="hidden md:block text-sm text-gray-400 mt-4">
          Created on{" "}
          {new Date(selectedTask.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
