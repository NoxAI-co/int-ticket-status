import { createFileRoute } from "@tanstack/react-router";
import CreateTicketForm from "@/components/CreateTicketForm";

export const Route = createFileRoute("/nuevo")({
  component: CreateTicketForm,
});
