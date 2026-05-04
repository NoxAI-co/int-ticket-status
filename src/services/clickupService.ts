import type { ClickUpComment, ClickUpTask, CreateTaskPayload } from "@/types/ClickUpTask";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_API_KEY;
const TEAM_ID = import.meta.env.VITE_TEAM_ID;

const getTaskUrl = (taskId: string, suffix = "") => {
  const baseUrl = `https://api.clickup.com/api/v2/task/${taskId}${suffix}`;
  const params = new URLSearchParams();
  
  if (TEAM_ID) {
    params.append("custom_task_ids", "true");
    params.append("team_id", TEAM_ID);
  }
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const clickupService = {
  async getTaskDetails(taskId: string): Promise<ClickUpTask> {
    if (!taskId) throw new Error("Task ID is required");

    const resp = await fetch(getTaskUrl(taskId), {
      method: "GET",
      headers: {
        Authorization: API_KEY,
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

    const resp = await fetch(getTaskUrl(taskId, "/comment"), {
      method: "GET",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }

    const data = await resp.json();
    return data.comments || [];
  },

  async addComment(taskId: string, comment: string): Promise<ClickUpComment> {
    if (!taskId) throw new Error("Task ID is required");
    if (!comment) throw new Error("Comment is required");

    const resp = await fetch(getTaskUrl(taskId, "/comment"), {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_text: comment }),
    });

    if (!resp.ok) {
      toast.error("Error al enviar el comentario");
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    } else {
      toast.success("Comentario enviado!");
    }

    return resp.json();
  },

  async createTask(payload: CreateTaskPayload): Promise<ClickUpTask> {
    const listId = import.meta.env.VITE_LIST_ID;
    if (!listId) throw new Error("VITE_LIST_ID no está configurado");

    const baseUrl = `https://api.clickup.com/api/v2/list/${listId}/task`;
    const params = new URLSearchParams();
    if (TEAM_ID) {
      params.append("custom_task_ids", "true");
      params.append("team_id", TEAM_ID);
    }
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, notify_all: true }),
    });

    if (!resp.ok) {
      toast.error("Error al crear el ticket de soporte");
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }

    toast.success("¡Ticket creado con éxito!");
    return resp.json();
  },

  async uploadAttachment(taskId: string, file: File) {
    if (!taskId) throw new Error("Task ID is required");
    if (!file) throw new Error("File is required");

    const formData = new FormData();
    formData.append("attachment", file);

    const resp = await fetch(getTaskUrl(taskId, "/attachment"), {
      method: "POST",
      headers: {
        Authorization: API_KEY,
      },
      body: formData,
    });

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }

    return resp.json();
  },
};
