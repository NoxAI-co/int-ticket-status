import { useState } from "react";
import { motion } from "framer-motion";
import { useClickUpTask } from "../hooks/useClickUpTask";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface CreateCommentProps {
  taskId: string;
}

export const CreateComment = ({ taskId }: CreateCommentProps) => {
  const [comment, setComment] = useState("");
  const { useAddComment } = useClickUpTask();
  const addCommentMutation = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addCommentMutation.mutateAsync({
      taskId,
      comment: comment.trim(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-neutral-100 dark:border-neutral-700 pt-4 mt-4"
    >
      <form onSubmit={handleSubmit} className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm border-2 border-white dark:border-neutral-700 font-bold">
            U
          </div>
        </div>
        <div className="flex-1 relative">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Adicione un comentario..."
            className="ring-1 ring-neutral-600"
            disabled={addCommentMutation.isPending}
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button
              type="submit"
              disabled={!comment.trim() || addCommentMutation.isPending}
              className={`dark:bg-primary/10 border-[1px] dark:border-primary dark:text-primary bg-primary hover:bg-primary/80 text-primary-foreground flex items-center gap-2 hover:opacity-70 cursor-pointer ${
                !comment.trim() || addCommentMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {addCommentMutation.isPending ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
