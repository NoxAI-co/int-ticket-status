import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useClickUpTask } from "../hooks/useClickUpTask";
import toast from "react-hot-toast";
import DynamicIslandModal from "../components/DynamicIslandModal";
import { TaskDetail } from "../components/TaskDetail";
import HeroSection from "@/components/HeroSection";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [taskId, setTaskId] = useState("");
  const [searchTaskId, setSearchTaskId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickUpTask = useClickUpTask();

  const {
    data: taskData,
    isLoading,
    isError,
  } = clickUpTask.useTaskDetails(searchTaskId);

  const { data: comments } = clickUpTask.useTaskComments(searchTaskId);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const ticketId = searchParams.get("ticket");

    if (ticketId) {
      setTaskId(ticketId);
      const cleanTaskId = ticketId.trim().replace(/#/g, "");
      setSearchTaskId(cleanTaskId);
      setIsModalOpen(true);
    }
  }, []);

  const handleSearch = () => {
    if (taskId.trim()) {
      const cleanTaskId = taskId.trim().replace(/#/g, "");
      setSearchTaskId(cleanTaskId);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen">
      <HeroSection
        taskId={taskId}
        setTaskId={setTaskId}
        isLoading={isLoading}
        handleSearch={handleSearch}
      />

      {isLoading &&
        toast.loading("Cargando...", {
          id: "loading",
          duration: 1000,
        })}

      {taskData && (
        <DynamicIslandModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TaskDetail
            taskData={taskData}
            comments={comments ?? []}
            searchTaskId={searchTaskId}
          />
        </DynamicIslandModal>
      )}
    </div>
  );
}
