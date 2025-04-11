"use client";
import React, { useEffect, useState, useMemo } from "react";
import TaskList from "@/components/TaskList";
import TaskDetail from "@/components/TaskDetails";

export default function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    if (isMobile) {
      setShowDetailMobile(true);
    }
  };

  const memoizedTask = useMemo(() => selectedTask, [selectedTask?._id]);

  const fetchTasks = async (page = 1, autoSelectFirst = true) => {
    try {
      const res = await fetch(
        `http://localhost:8001/api/tasks?page=${page}&limit=5`
      );
      const data = await res.json();

      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);

      if (autoSelectFirst && data.tasks.length > 0) {
        setSelectedTask(data.tasks[0]);
      }
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );

    if (selectedTask?._id === updatedTask._id) {
      setSelectedTask(updatedTask);
    }
  };

  const handleDeleteTask = async (deleteTask) => {
    try {
      const res = await fetch(`http://localhost:8001/api/tasks/${deleteTask}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.log("Error while deleting a task!", error);
    }
  };

  const handleAddNewTask = async () => {
    try {
      const res = await fetch(`http://localhost:8001/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.log("Error while creating a new task", Error);
    }
  };

  return (
    <main className="h-screen max-w-6xl mx-auto flex justify-around items-start p-6 gap-10">
      <div className="flex-1 w-full">
        {isMobile ? (
          !showDetailMobile ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => handleAddNewTask()}
                  className="px-3 rounded-lg text-sm py-2 m-2 font-mono bg-neutral-800 text-neutral-50 hover:bg-neutral-900 cursor-pointer"
                >
                  Todo
                </button>

                <button className="px-3 text-xs py-2 m-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                  </svg>
                </button>
              </div>

              <TaskList
                tasks={tasks}
                onTaskClick={(task) => {
                  setSelectedTask(task);
                  setShowDetailMobile(true);
                }}
              />

              <div className="flex gap-2 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="cursor-pointer"
                >
                  ⬅ Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="cursor-pointer"
                >
                  Next ➡
                </button>
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={() => setShowDetailMobile(false)}
                className="mb-4 text-sm bg-neutral-800 text-white hover:underline px-3 py-2"
              >
                ← Back
              </button>
              <TaskDetail
                selectedTask={memoizedTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            </div>
          )
        ) : (
          <div className="flex gap-10">
            <div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => handleAddNewTask()}
                  className="px-3 rounded-lg text-sm py-2 m-2 font-mono bg-neutral-800 text-neutral-50 hover:bg-neutral-900 cursor-pointer"
                >
                  Todo
                </button>

                <button className="px-3 text-xs py-2 m-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                  </svg>
                </button>
              </div>

              <TaskList tasks={tasks} onTaskClick={setSelectedTask} />

              <div className="flex gap-2 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="cursor-pointer"
                >
                  ⬅ Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="cursor-pointer"
                >
                  Next ➡
                </button>
              </div>
            </div>

            <TaskDetail
              selectedTask={memoizedTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </div>
        )}
      </div>
    </main>
  );
}
