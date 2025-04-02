import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useClickUpTask } from "../hooks/useClickUpTask";
import toast from "react-hot-toast";
import DynamicIslandModal from "../components/DynamicIslandModal";
import { TaskDetail } from "../components/TaskDetail";

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
    error,
  } = clickUpTask.useTaskDetails(searchTaskId);

  const { data: comments } = clickUpTask.useTaskComments(searchTaskId);

  // Check for ticket ID in URL query parameters when component mounts
  useEffect(() => {
    // Parse URL query parameters
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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ClickUp Task Viewer</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Enter ClickUp Task ID"
          className="flex-1 p-2 border rounded"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={!taskId}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>

      {error && toast.error("Error interno. Intente nuevamente mas tarde.")}

      {isLoading && <p>Loading...</p>}

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
