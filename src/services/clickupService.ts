import type { ClickUpComment, ClickUpTask } from "@/types/ClickUpTask";
import toast from "react-hot-toast";

export const clickupService = {
  async getTaskDetails(taskId: string): Promise<ClickUpTask> {
    if (!taskId) throw new Error("Task ID is required");

    const resp = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
      method: "GET",
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      toast.error("Error al encontrar el ticket");
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    } else {
      toast.success("Ticket encontrado!");
    }

    return resp.json();
  },

  async getTaskComments(taskId: string): Promise<ClickUpComment[]> {
    if (!taskId) throw new Error("Task ID is required");

    const resp = await fetch(
      `https://api.clickup.com/api/v2/task/${taskId}/comment`,
      {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }

    const data = await resp.json();
    return data.comments || [];
  },

  async addComment(taskId: string, comment: string): Promise<ClickUpComment> {
    if (!taskId) throw new Error("Task ID is required");
    if (!comment) throw new Error("Comment is required");

    const resp = await fetch(
      `https://api.clickup.com/api/v2/task/${taskId}/comment`,
      {
        method: "POST",
        headers: {
          Authorization: import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_text: comment }),
      }
    );
    
    if (!resp.ok) {
      toast.error("Error al enviar el comentario");
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }else{
      toast.success("Comentario enviado!");
    }

    return resp.json();
  },

  async uploadAttachment(taskId: string, file: File) {
    if (!taskId) throw new Error("Task ID is required");
    if (!file) throw new Error("File is required");

    const formData = new FormData();
    formData.append("attachment", file);

    const resp = await fetch(
      `https://api.clickup.com/api/v2/task/${taskId}/attachment`,
      {
        method: "POST",
        headers: {
          Authorization: import.meta.env.VITE_API_KEY,
        },
        body: formData,
      }
    );

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }

    return resp.json();
  },
};
